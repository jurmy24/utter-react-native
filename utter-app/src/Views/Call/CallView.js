import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import useFileUpload from "../../hooks/useAudioUpload";
import useAudioRecorder from "../../hooks/useAudioRecorder";
import useSpeechSynth from "../../hooks/useAudioHandler";
import Avatar from "../Components/Avatars";
import { useRoute } from "@react-navigation/native";
import { generalStyles } from "../stylesheets/general_styles";
import { BallIndicator } from "react-native-indicators";
import useTextModel from "../../hooks/useTextUpload";

// import PartnerImage from './PartnerImage'; // Assuming you have this component
// import LoadingBalls from './LoadingBalls'; // Assuming you have this component

const assetsPath = "../../assets/";
// Import all avatar images
const speaking_icon = {
  white: require(assetsPath + "icons/speaking_icon_white.png"),
  blue: require(assetsPath + "icons/speaking_icon_blue.png"),
};

const CallView = ({ navigation }) => {
  // Check which chatview we are entering
  const route = useRoute();
  const chatbotId = route.params?.chatbotId; // This will be either "english" or "french"
  const languagePartnerName =
    chatbotId === "english-chatbot" ? "Tim" : "Claire";

  const { uploadAudioFile, uploadStatus, error } = useFileUpload(chatbotId);
  const [transcribedMessage, setTranscribedMessage] = useState("");
  const { startRecording, stopRecording } = useAudioRecorder();
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { synthesizeText, playAudio, stopAudio } = useSpeechSynth(chatbotId);
  const { submitMessage } = useTextModel(chatbotId);
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (message) => {
    setErrorMessage(message); // Set the actual message
    Alert.alert("Error", message, [{ text: "OK" }]);
  };

  /* -----------Handle verbal submission------------- */

  const handleStartRecording = async () => {
    stopAudio();
    setIsRecording(true);
    await startRecording();
  };

  const handleSendRecording = async () => {
    setIsLoading(true); // Start loading
    // Only send recording if we are actually recording
    if (isRecording) {
      try {
        const uri = await stopRecording(); // Stop the recording
        setIsRecording(false);

        if (!uri) {
          // Handle the case where no recording was made
          showError(
            "Your audio message might've been too short to send. Please try again!"
          );
          setIsLoading(false);
          return;
        }

        try {
          const transcription = await uploadAudioFile(uri);
          setTranscribedMessage(transcription);
          const gptResponse = await submitMessage(transcription);
          const audioFilePath = await synthesizeText(gptResponse);
          setTranscribedMessage("");
          await playAudio(audioFilePath);
        } catch (uploadError) {
          setTranscribedMessage("");
          showError(
            "There was an error processing your audio. Please try again."
          );
          // Log the error for debugging purposes
          console.error("(CallView) handleSendRecording:", uploadError);
        }
      } catch (recordingError) {
        showError("An error occurred while recording. Please try again.");
        // Log the error for debugging purposes
        console.error("Error during recording:", recordingError);
      }
    } else {
      showError("No audio message detected. Please try recording again.");
    }

    setIsLoading(false); // Stop loading
  };

  return (
    <ImageBackground
      source={require(assetsPath + "images/slidingBackgroundWide.png")}
      style={generalStyles.background_style}
    >
      <SafeAreaView style={generalStyles.safeArea}>
        <View style={styles.content}>
          <View style={{ marginBottom: 40 }}>
            <Avatar chatbotId={chatbotId} size={150} />
          </View>
          <Text style={styles.chatbotName}>{languagePartnerName}</Text>
          <View style={{ marginVertical: 80 }}></View>

          {transcribedMessage !== "" && (
            <View style={styles.messageOverlay}>
              <View style={styles.bubblyTextContainer}>
                <Text style={styles.bubblyText}>{transcribedMessage}</Text>
              </View>
            </View>
          )}
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <BallIndicator color="blue" />
            </View>
          )}

          <TouchableOpacity
            onPress={() => {
              stopAudio();
              stopRecording();
              navigation.navigate("Chat", { chatbotId });
            }}
            style={styles.endCallButton}
          >
            <Text style={styles.endCallButtonText}>End Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPressIn={handleStartRecording}
            onPressOut={handleSendRecording}
            style={{
              ...styles.recordButton,
              backgroundColor: isRecording ? "#5A5AF6" : "white",
            }}
          >
            <Image
              source={
                isRecording ? speaking_icon["white"] : speaking_icon["blue"]
              }
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
          <Text style={styles.recordButtonText}>
            {isRecording ? "Recording..." : "Push and hold to talk"}
          </Text>
        </View>
        {errorMessage !== "" && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "vertical",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%", // Adjust as needed
  },
  chatbotName: {
    fontSize: 24,
    marginVertical: 40,
  },
  recordButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  recordButtonText: {
    color: "white",
    fontSize: 14,
    marginBottom: 15,
  },
  endCallButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  endCallButtonText: {
    color: "white",
    fontSize: 16,
  },
  loadingOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: "rgba(128, 128, 128, 0.5)", // Greyed out background
    justifyContent: "flex-start",
    paddingBottom: "40%",
    alignItems: "center",
    zIndex: 2, // Make sure it covers other content
  },
  messageOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: "rgba(128, 128, 128, 0.5)", // Greyed out background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Make sure it covers other content
    paddingHorizontal: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    // other styles as needed
  },
  bubblyTextContainer: {
    marginTop: 20, // Adjust the space between the indicator and the text
    paddingHorizontal: 20, // Side padding for text container
    paddingVertical: 10, // Vertical padding for text container
    backgroundColor: "white", // Background color for the bubbly text
    borderRadius: 25, // Rounded corners for the bubbly feel
    // Add shadow or other styles to enhance the bubbly effect
  },
  bubblyText: {
    fontSize: 16, // Adjust as needed
    color: "black", // Text color
    textAlign: "center", // Center-align text
    // Additional text styles if needed
  },
});

export default CallView;
