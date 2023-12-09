import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Enum-like object for sender
const Sender = {
  User: "user",
  Assistant: "assistant",
};

const MessageView = ({ sender, message }) => {
  const isUser = sender === Sender.User;
  const messageStyle = isUser ? styles.userMessage : styles.assistantMessage;
  const bubbleStyle = isUser ? styles.userBubble : styles.assistantBubble;

  return (
    <View style={styles.container}>
      <View
        style={[styles.messageContainer, isUser && styles.userMessageContainer]}
      >
        <Text style={[styles.message, messageStyle, bubbleStyle]}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
  messageContainer: {
    maxWidth: "80%",
  },
  userMessageContainer: {
    marginLeft: "auto",
  },
  message: {
    padding: 10,
    borderRadius: 15,
  },
  userMessage: {
    backgroundColor: "blue", // Replace with your accent color
    color: "white",
    borderTopRightRadius: 0,
  },
  assistantMessage: {
    backgroundColor: "white",
    color: "black",
    borderTopLeftRadius: 0,
  },
  // You can add shadow or other styles as you like here
});

export default MessageView;
