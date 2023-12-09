import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import MessageView from "./MessageView";
import { useNavigation } from "@react-navigation/native";

const ChatView = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [text, setText] = useState("");
  const [chatMessages, setChatMessages] = useState([]); // Replace with your chat messages state logic
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;

  // Fetch chat history when component mounts
  useEffect(() => {
    // Replace with your logic to fetch chat messages
    // setChatMessages(fetchYourChatHistory());
  }, []);

  const handleSend = () => {
    // Logic to send a message and update chat history
    // You would call something like your chat model's send function here
    setText("");
    // setChatMessages(updateYourChatHistory());
  };

  const handleJoinCall = () => {
    // Logic to handle joining the call
    setIsInCall(true);
  };

  //   if (isInCall) {
  //     return <SpeakerView />;
  //   }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Your logic to display the background image */}
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {/* Display chat messages */}
        {chatMessages.map((messageData, index) => (
          <MessageView
            key={index}
            sender={messageData.sender}
            message={messageData.content}
          />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="Type something..."
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Call")}
          style={styles.callButton}
        >
          {/* Here above we should use the handleJoinCall funciton later */}
          <Text style={styles.callButtonText}>Join Talk</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
  callButton: {
    backgroundColor: "blue",
    borderRadius: 50,
    padding: 20,
  },
  callButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  backButtonText: {
    // Style for your back button text
  },
  // Add styles for the rest of your components
});

// export default ChatView;
