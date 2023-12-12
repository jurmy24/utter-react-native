import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
} from "react-native";
import useFileUpload from "../../hooks/useFileUpload";
import useAudioRecorder from "../../hooks/useAudioRecorder";
import useSpeechSynth from "../../hooks/useSpeechSynth";
import Avatar from "../Components/Avatars";
import { useRoute } from "@react-navigation/native";
import { generalStyles } from "../stylesheets/general_styles";
import { BallIndicator } from "react-native-indicators";
import useTextModel from "../../hooks/textModel";

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
  const { startRecording, stopRecording } = useAudioRecorder();
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { synthesizeText, playAudio, stopAudio } = useSpeechSynth(chatbotId);
  const { submitMessage } = useTextModel(chatbotId);

  // const navigation = useNavigation(); // This hook is provided by React Navigation

  /* -----------Handle verbal submission------------- */
  const handleStartRecording = () => {
    setIsRecording(true);
    startRecording();
  };

  const handleSendRecording = async () => {
    setIsRecording(false);
    setIsLoading(true); // Start loading
    let uri;
    if (isRecording) {
      uri = await stopRecording(); // Stop the recording if it's still happening
    } else {
      console.error("I think the audio message was too short");
    }

    if (uri) {
      try {
        const transcription = await uploadAudioFile(uri);
        const gptResponse = await submitMessage(transcription);
        const audioFilePath = await synthesizeText(gptResponse);
        await playAudio(audioFilePath);
      } catch (error) {
        console.error("Error during file upload:", error);
        // Handle errors in UI, such as showing an error message
      }
    } else {
      console.error("No recording found");
      // Optionally handle the case where there is no recording
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

          {isLoading && (
            <View style={styles.loadingOverlay}>
              <BallIndicator color="blue" />
            </View>
          )}

          <TouchableOpacity
            onPress={() => {
              stopAudio();
              navigation.navigate("Chat", { chatbotId });
            }}
            style={styles.endCallButton}
          >
            <Text style={styles.endCallButtonText}>End Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
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
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Make sure it covers other content
  },
});

export default CallView;
