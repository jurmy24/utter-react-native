import React, { useEffect, useState } from "react";
import { initWhisper, AudioSessionIos } from "whisper.rn";
import {
  TextInput,
  Button,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import AWS from "aws-sdk";
import axios from "axios";
import { BallIndicator } from "react-native-indicators";
import Icon from "react-native-vector-icons/FontAwesome";

AWS.config.update({
  accessKeyId: "AKIAZPFZDFGGBQA7HYVB",
  secretAccessKey: "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",
  region: "eu-west-3",
});

export default function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Define the state with a specific type (use the actual type instead of `any` if available)
  const [whisperContext, setWhisperContext] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  // const [transcription, setTranscription] = useState("");
  const [stopFunction, setStopFunction] = useState(null);

  // Request permissions from android
  if (Platform.OS === "android") {
    // Request record audio permission
    // @ts-ignore
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
      title: "Whisper Audio Permission",
      message: "Whisper needs access to your microphone",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    });
  }

  useEffect(() => {
    const setupWhisper = async () => {
      const context = await initWhisper({
        filePath: require("utter-app/assets/ggml-tiny.en.bin"),
        // Include CoreML model settings for iOS here if needed
        coreMLModelAsset:
          Platform.OS === "ios"
            ? {
                filename: "ggml-tiny.en-encoder.mlmodelc",
                assets: [
                  require("utter-app/assets/ggml-tiny.en-encoder.mlmodelc/weights/weight.bin"),
                  require("utter-app/assets/ggml-tiny.en-encoder.mlmodelc/model.mil"),
                  require("utter-app/assets/ggml-tiny.en-encoder.mlmodelc/coremldata.bin"),
                ],
              }
            : undefined,
      });
      setWhisperContext(context);
    };
    setupWhisper();
  }, []);

  const startTranscription = async () => {
    if (!whisperContext) return;

    const options = {
      language: "en",
      // Record duration in seconds
      realtimeAudioSec: 60,
      // Slice audio into 25 (or < 30) sec chunks for better performance
      realtimeAudioSliceSec: 25,
      // iOS Audio Session
      audioSessionOnStartIos: {
        category: AudioSessionIos.Category.PlayAndRecord,
        options: [
          AudioSessionIos.CategoryOption.MixWithOthers,
          AudioSessionIos.CategoryOption.AllowBluetooth,
        ],
        mode: AudioSessionIos.Mode.Default,
      },
      audioSessionOnStopIos: "restore", // Or an AudioSessionSettingIos
      // Voice Activity Detection - Start transcribing when speech is detected
      // useVad: true,
    };

    try {
      // Your transcription start logic
      const { stop, subscribe } = await whisperContext.transcribeRealtime(
        options
      );
      setStopFunction(() => stop); // Store the stop function

      // Optional: Manage Audio Session for iOS
      if (Platform.OS === "ios") {
        await AudioSessionIos.setCategory(
          AudioSessionIos.Category.PlayAndRecord,
          [AudioSessionIos.CategoryOption.MixWithOthers]
        );
        await AudioSessionIos.setMode(AudioSessionIos.Mode.Default);
        await AudioSessionIos.setActive(true);
      }

      subscribe((evt) => {
        const { isCapturing, data, processTime, recordingTime } = evt;
        console.log(
          `Realtime transcribing: ${isCapturing ? "ON" : "OFF"}\n` +
            // The inference text result from audio record:
            `Result: ${data.result}\n` +
            `Process time: ${processTime}ms\n` +
            `Recording time: ${recordingTime}ms\n\n`
        );
        setText(data.result);
        setIsCapturing(isCapturing);

        if (!isCapturing) {
          console.log("Finished realtime transcribing");
        }
      });
    } catch (error) {
      console.error("Error starting real-time transcription:", error);
    }
  };

  const stopTranscription = () => {
    // Check if the stop function is available
    if (stopFunction) {
      stopFunction(); // Call the stop function to end transcription
      setStopFunction(null); // Reset the stop function state
      setIsCapturing(false); // Update the capturing state
    } else {
      console.log("No active transcription to stop");
    }
  };

  const handleStopTranscriptionButton = async () => {
    stopTranscription();
    await handleTextSubmit();
  };

  // const sendTranscription = async () => {
  //   setMessages((oldMessages) => [
  //     ...oldMessages,
  //     { transcription, sender: "user" },
  //   ]);
  //   setIsLoading(true); // Start loading

  //   try {
  //     // OpenAI API call
  //     const gptResponse = await fetchAIResponse(text);

  //     const responseText = gptResponse.choices[0].text.trim();
  //     const audioUrl = await synthesizeText(responseText);

  //     // Add the response to messages and play the audio
  //     setMessages((oldMessages) => [
  //       ...oldMessages,
  //       { text: responseText, sender: "ai", audioUrl },
  //     ]);
  //     await playAudio(audioUrl); // Play the audio immediately

  //     setIsLoading(false); // End loading
  //     setText("");
  //   } catch (error) {
  //     console.error("Error with OpenAI or Polly:", error);
  //   }
  // };

  const handleTextSubmit = async () => {
    setMessages((oldMessages) => [...oldMessages, { text, sender: "user" }]);
    setIsLoading(true); // Start loading

    try {
      // OpenAI API call
      const gptResponse = await fetchAIResponse(text);

      const responseText = gptResponse.choices[0].text.trim();
      const audioUrl = await synthesizeText(responseText);

      // Add the response to messages and play the audio
      setMessages((oldMessages) => [
        ...oldMessages,
        { text: responseText, sender: "ai", audioUrl },
      ]);
      await playAudio(audioUrl); // Play the audio immediately

      setIsLoading(false); // End loading
      setText("");
    } catch (error) {
      console.error("Error with OpenAI or Polly:", error);
    }
  };

  const fetchAIResponse = async (text) => {
    const apiKey = "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";
    const prompt = text;
    try {
      const result = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: prompt,
          max_tokens: 50,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      return result.data;
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={isCapturing ? stopTranscription : startTranscription}
      >
        <Text>
          {isCapturing ? "Stop Transcription" : "Start Transcription"}
        </Text>
      </TouchableOpacity>
      <Button title="Send" onPress={handleTextSubmit} />
      {/* <Text style={styles.transcription}>{transcription}</Text> */}

      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={
              msg.sender === "user" ? styles.userMessage : styles.aiMessage
            }
          >
            <Text>{msg.text}</Text>
          </View>
        ))}
        {isLoading && (
          <BallIndicator color="blue" style={styles.loadingIndicator} />
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message here"
          value={text}
          onChangeText={setText}
          editable={!isLoading}
        />
        <TouchableOpacity
          onPress={handleTextSubmit}
          disabled={isLoading}
          style={styles.sendButton}
        >
          <Icon name="send" size={20} color={isLoading ? "gray" : "blue"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20, // Adds padding around the whole container
  },
  messagesContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 20, // Adjust as needed
  },
  input: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10, // Space between input and button
  },
  sendButton: {
    padding: 10, // Adjust for touch area
  },
  userMessage: {
    // Styles for user's chat bubbles
    backgroundColor: "#e6e6e6",
    alignSelf: "flex-end",
    padding: 8,
    borderRadius: 10,
    margin: 4,
  },
  aiMessage: {
    // Styles for AI's chat bubbles
    backgroundColor: "#d1edf2",
    alignSelf: "flex-start",
    padding: 8,
    borderRadius: 10,
    margin: 4,
  },
  loadingIndicator: {
    marginVertical: 10, // Adds vertical space around the indicator
    alignSelf: "center", // Centers the indicator horizontally
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    paddingVertical: 50,
  },
  transcription: {
    marginTop: 20,
    paddingHorizontal: 10,
    textAlign: "center",
  },
});

const playAudio = async (filePath) => {
  try {
    const { sound, status } = await Audio.Sound.createAsync({ uri: filePath });
    await sound.playAsync();

    // Add a listener to know when the audio has finished playing
    sound.setOnPlaybackStatusUpdate(async (playbackStatus) => {
      if (playbackStatus.didJustFinish) {
        // Audio playback finished, unload and delete the file
        await sound.unloadAsync();
        await FileSystem.deleteAsync(filePath);
      }
    });
  } catch (error) {
    console.error("Error playing audio:", error);
    // Handle the error appropriately
  }
};

const synthesizeText = async (text) => {
  const Polly = new AWS.Polly();

  const params = {
    Text: text,
    OutputFormat: "mp3",
    Engine: "neural",
    VoiceId: "Joanna", // You can choose different voices
  };

  try {
    const pollyResponse = await Polly.synthesizeSpeech(params).promise();
    const audioFilePath = `${
      FileSystem.documentDirectory
    }${new Date().getTime()}.mp3`;
    await FileSystem.writeAsStringAsync(
      audioFilePath,
      pollyResponse.AudioStream.toString("base64"),
      { encoding: FileSystem.EncodingType.Base64 }
    );

    return audioFilePath;
  } catch (error) {
    console.error("Error synthesizing text with Polly:", error);
    // Handle the error appropriately
  }
};
