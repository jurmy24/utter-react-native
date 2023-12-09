import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
// import PartnerImage from './PartnerImage'; // Assuming you have this component
// import LoadingBalls from './LoadingBalls'; // Assuming you have this component

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const CallView = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [userTranscript, setUserTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize Voice or Tts here
    // Example:
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      // Remember to destroy the listeners when the component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (result) => {
    if (result.value && result.value.length > 0) {
      setUserTranscript(result.value[0]); // Update state with the latest transcription
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // Voice.start("en-US"); // Start recording
  };

  const endRecording = () => {
    setIsRecording(false);
    // Voice.stop(); // Stop recording
  };

  const sendMessage = () => {
    setIsLoading(true);
    // Logic to send the userTranscript to your chat model and get a response
    // After getting the response, use Tts to speak out the response
    // Tts.speak("This is the response."); // Replace with actual response
    setIsLoading(false);
  };

  // if (isLoading) {
  //   return <LoadingBalls />;
  // }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("./../../assets/avatars/tim_avatar.png")}
        style={{ width: 200, height: 200, borderRadius: 10 }}
      />
      {/* Add other UI components here */}
      <TouchableOpacity
        onPress={startRecording}
        onRelease={endRecording}
        style={styles.recordButton}
      >
        <Text>{isRecording ? "Recording..." : "Press to speak"}</Text>
      </TouchableOpacity>
      {/* Add a button to end the call */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat")}
        style={styles.endCallButton}
      >
        <Text>End Call</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recordButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  endCallButton: {
    // Styles for your end call button
  },
  // Add styles for other components as needed
});

export default CallView;
