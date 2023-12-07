import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BallIndicator } from "react-native-indicators";
import useVoiceRecModel from "./src/hooks/voiceRecModel";
import useTextModel from "./src/hooks/textModel";
import useSpeechSynthModel from "./src/hooks/speechSynthModel";

export default function App() {
  const [inputText, setInputText] = useState("");
  const { isCapturing, transcription, startTranscription, stopTranscription } =
    useVoiceRecModel();
  const { messages, submitMessage, isLoading } = useTextModel();
  const { synthesizeText, playAudio } = useSpeechSynthModel();

  const handleSendText = async () => {
    submitMessage(inputText);
    setInputText("");
    console.log(messages);
  };

  const handleSendTranscription = async () => {
    stopTranscription();
    const response = await submitMessage(transcription);
    const audioFilePath = await synthesizeText(response);
    await playAudio(audioFilePath);
  };

  const scrollViewRef = useRef(); // Create a ref for the ScrollView

  // Scroll to the bottom every time messages change
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100); // Adjust the timeout as needed
    }
  }, [messages]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.messagesContainer} ref={scrollViewRef}>
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
        </ScrollView>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPressIn={startTranscription}
            onPressOut={handleSendTranscription}
            style={styles.transcriptionButton}
          >
            <Icon
              name="microphone"
              size={25}
              color={isCapturing ? "red" : "blue"}
            />
          </TouchableOpacity>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            style={styles.input}
            placeholder="Type your message here"
            onSubmitEditing={handleSendText}
          />
          <TouchableOpacity onPress={handleSendText} style={styles.sendButton}>
            <Icon name="send" size={20} color={isLoading ? "gray" : "blue"} />
          </TouchableOpacity>
        </View>
        {/* Loading Overlay */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <BallIndicator color="blue" />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: "white",
  },
  transcriptionButton: {
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  transcriptionButtonText: {
    color: "white",
  },
  sendButtonText: {
    color: "white",
  },
  messagesContainer: {
    flex: 1,
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
  loadingOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(128, 128, 128, 0.5)", // Greyed out background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Make sure it covers other content
  },
});
