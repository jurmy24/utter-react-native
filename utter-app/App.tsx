import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { initWhisper, AudioSessionIos } from "whisper.rn";

const App = () => {
  // Define the state with a specific type (use the actual type instead of `any` if available)
  const [whisperContext, setWhisperContext] = useState<any | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [stopFunction, setStopFunction] = useState<(() => void) | null>(null);

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

    subscribe(
      (evt: {
        isCapturing: any;
        data: any;
        processTime: any;
        recordingTime: any;
      }) => {
        const { isCapturing, data, processTime, recordingTime } = evt;
        console.log(
          `Realtime transcribing: ${isCapturing ? "ON" : "OFF"}\n` +
            // The inference text result from audio record:
            `Result: ${data.result}\n\n` +
            `Process time: ${processTime}ms\n` +
            `Recording time: ${recordingTime}ms`
        );
        setTranscription(data.result);
        setIsCapturing(isCapturing);

        if (!isCapturing) {
          console.log("Finished realtime transcribing");
        }
      }
    );

    // subscribe((evt: { isCapturing?: any; data?: any }) => {
    //   const { data } = evt;
    //   setTranscription(data.result);
    //   setIsCapturing(evt.isCapturing);
    // });
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
      <Text style={styles.transcription}>{transcription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  transcription: {
    marginTop: 20,
    paddingHorizontal: 10,
    textAlign: "center",
  },
});

export default App;
