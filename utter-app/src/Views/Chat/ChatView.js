import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BallIndicator } from "react-native-indicators";
import useTextUpload from "../../hooks/useTextUpload";
import io from "socket.io-client";
import uniqueId from "../../uuid_file";
import { useRoute, useNavigation } from "@react-navigation/native";
import { generalStyles } from "../stylesheets/general_styles";
import Avatar from "../Components/Avatars";
import TypingIndicator from "../Components/TypingIndicator"; // Import your typing indicator component

const assetsPath = "../../assets/";

const initializeSocket = (chatbotId) => {
  const deviceId = uniqueId;
  return io("http://192.168.181.202:3000", {
    query: { deviceId, chatbotId },
  });
};

const ChatView = () => {
  // Check which chatview we are entering
  const route = useRoute();
  const chatbotId = route.params?.chatbotId; // This will be either "english" or "french"
  const languagePartnerName =
    chatbotId === "english-chatbot" ? "Tim" : "Claire";
  const navigation = useNavigation();

  // TODO: set a local chatId in the parameters of this to distinguish between the different chats a user can have
  const [inputText, setInputText] = useState("");
  const { submitMessage } = useTextUpload(chatbotId);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const deviceId = uniqueId;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  /*  ----------Handle socket IO for chat history updates----------- */
  const socket = useRef(null);
  useEffect(() => {
    // Initialize the socket connection with the current chatbotId
    socket.current = initializeSocket(chatbotId);

    // Handle connection
    socket.current.on("connect", () => {
      // console.log("Connected to server via WebSocket");
      // Request the chat history for the specific device and chatbot
      socket.current.emit("requestChatHistory", { deviceId, chatbotId });
    });

    // Handle receiving chat history
    socket.current.on("serverHistoryPush", (history) => {
      // console.log("Received message history:", history);
      setChatHistory(history);
    });

    // Cleanup function to remove event listeners
    return () => {
      socket.current.off("connect");
      socket.current.off("serverHistoryPush");
      socket.current.disconnect();
    };
  }, [chatbotId]);

  /*  ----------Handle button swap during keyboard popup----------- */
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  /*  ----------Handle textual submission----------- */
  const handleSendText = async () => {
    setIsLoading(true); // Start loading
    // console.log("This is the input text:", inputText);
    await submitMessage(inputText);
    setInputText("");
    setIsLoading(false); // Stop loading
  };

  /*  ---------------Scroll to the bottom every time messages change----------- */
  const scrollViewRef = useRef(); // Create a ref for the ScrollView
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100); // Adjust the timeout as needed
    }
  }, [chatHistory]);

  /*  ----------View----------- */
  return (
    <ImageBackground
      source={require(assetsPath + "images/slidingBackgroundWide.png")}
      style={generalStyles.background_style}
    >
      <View
        style={{
          ...generalStyles.row,
          backgroundColor: "#ffff",
          width: "100%",
          paddingTop: 40,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={20} color="#5A5AF6" />
        </TouchableOpacity>
        <Text style={generalStyles.header}>{languagePartnerName}</Text>
        <Avatar chatbotId={chatbotId} size={40} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ padding: 10, marginBottom: 10 }}
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollViewContent}
        >
          {chatHistory.map((msg, index) => (
            <View
              key={index}
              style={
                msg.role === "user" ? styles.userMessage : styles.aiMessage
              }
            >
              <Text
                style={{
                  color: msg.role === "user" ? "white" : "black",
                  lineHeight: 18,
                }}
              >
                {msg.content}
              </Text>
            </View>
          ))}
        </ScrollView>
        {/* Typing Indicator */}
        {isLoading && (
          <View style={styles.typingIndicator}>
            <TypingIndicator />
          </View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            style={styles.input}
            placeholder="Type your message here"
            onSubmitEditing={handleSendText}
          />
          <TouchableOpacity
            onPress={
              inputText
                ? handleSendText
                : () => navigation.navigate("Call", { chatbotId: chatbotId })
            }
            style={styles.button}
          >
            <Icon
              name={inputText ? "send" : "phone"}
              size={inputText ? 20 : 25}
              style={{ paddingRight: inputText ? 3 : 0 }}
              color={inputText ? (isLoading ? "gray" : "white") : "white"}
            />
          </TouchableOpacity>
        </View>
        {/* Loading Overlay
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <BallIndicator color="blue" />
          </View>
        )} */}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingTop: 0,
    width: "100%",
    paddingHorizontal: Platform.OS === "ios" ? 20 : 15,
    marginBottom: Platform.OS === "ios" ? 15 : 5,
  },
  input: {
    flex: 4,
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
  userMessage: {
    // Styles for user's chat bubbles
    backgroundColor: "#5A5AF6",
    alignSelf: "flex-end",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    margin: 4,
    marginVertical: 5,
    marginLeft: 30,
    borderBottomRightRadius: 2,
  },
  aiMessage: {
    // Styles for AI's chat bubbles
    backgroundColor: "white",
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    margin: 4,
    marginVertical: 5,
    borderBottomLeftRadius: 2,
    marginRight: 30,
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
  button: {
    width: 45, // Set a fixed width for the circle
    height: 45, // Set a fixed height for the circle
    borderRadius: 22.5, // Half of the width and height to make it a perfect circle
    backgroundColor: "#5A5AF6", // Use a color that stands out for the button
    alignItems: "center",
    justifyContent: "center",
    // Add shadow or other styling as needed
  },
  backButton: {
    padding: 10,
  },
  scrollViewContent: {
    paddingBottom: 30, // Adjust this value to add more or less space at the bottom
  },
  typingIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 50, // Adjust this value to position the indicator appropriately
    padding: 20,
    alignItems: "left",
  },
});

export default ChatView;
