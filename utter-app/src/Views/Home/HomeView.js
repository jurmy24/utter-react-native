import React, { useState, useCallback } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import LanguagePartnerRow from "./LanguagePartnerRow";
import { generalStyles } from "../stylesheets/general_styles";
import uniqueId from "../../uuid_file";
import axios from "axios";

const assetsPath = "../../assets/";

const HomeView = () => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const navigation = useNavigation(); // This hook is provided by React Navigation

  // Add state to keep track of the last messages for each chatbot
  const [lastMessageEnglish, setLastMessageEnglish] = useState("");
  const [lastMessageFrench, setLastMessageFrench] = useState("");

  const refreshChatHistory = async (chatbotId) => {
    try {
      const response = await axios.get(
        `http://192.168.181.202:3000/message-history/latest`,
        {
          params: { deviceId: uniqueId, chatbotId },
        }
      );
      let messages = response.data;
      let lastMessage = "";
      if (messages.length > 0) {
        lastMessage = messages[messages.length - 1].content;
        // Limit to 35 characters and append "..." if longer
        lastMessage =
          lastMessage.length > 35
            ? lastMessage.substring(0, 35) + "..."
            : lastMessage;
      }
      if (chatbotId == "english-chatbot") {
        setLastMessageEnglish(lastMessage);
      } else {
        setLastMessageFrench(lastMessage);
      }
    } catch (error) {
      console.error("Error fetching latest messages:", error);
    }
  };

  // Use focus effect to update chat history when the view comes into focus
  useFocusEffect(
    useCallback(() => {
      // Initialize WebSocket connections for each chatbot and fetch latest messages
      refreshChatHistory("english-chatbot");
      refreshChatHistory("french-chatbot");

      // Return a cleanup function if needed
      return () => {
        // Cleanup logic (if necessary)
      };
    }, [])
  );

  return (
    <ImageBackground
      source={require(assetsPath + "images/slidingBackgroundWide.png")}
      style={generalStyles.background_style}
    >
      <SafeAreaView
        style={{
          ...generalStyles.safeArea,
          flex: 0,
        }}
      >
        <View style={generalStyles.row}>
          <Text style={generalStyles.header}>Language Partners</Text>
          {/* "+" Button at the top */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              /* Action for the "+" button */
            }}
          >
            <Text style={styles.circularButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.languagePartnerListContainer}>
        <View style={styles.languagePartnersList}>
          {/* This TouchableOpacity should navigate to the ChatView when pressed */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Chat", { chatbotId: "english-chatbot" })
            }
          >
            <LanguagePartnerRow
              chatbotId="english-chatbot"
              lastMessage={lastMessageEnglish}
              style={{ paddingHorizontal: 15 }}
            />
          </TouchableOpacity>
          <View style={styles.divider} />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Chat", { chatbotId: "french-chatbot" })
            }
          >
            <LanguagePartnerRow
              chatbotId="french-chatbot"
              lastMessage={lastMessageFrench}
              style={{ paddingHorizontal: 15 }}
            />
          </TouchableOpacity>

          <View style={styles.divider} />
          {/* Add more LanguagePartnerRows here as needed */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // Maybe this doesn't belong here
  languagePartnerListContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: "100%",
    paddingHorizontal: 0,
    height: "100%",
    // Add padding or margin as needed
  },
  // Maybe this doesn't belong here
  languagePartnersList: {
    marginTop: 10, // Adjust as needed
    backgroundColor: "#FFFFFF",
    // Add shadow or other styles as needed
  },

  divider: {
    height: 1,
    backgroundColor: "lightgray",
    marginHorizontal: 15,
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#5A5AF6",
    justifyContent: "center",
    alignItems: "center",
  },

  circularButtonText: {
    fontSize: 24,
    color: "white",
  },
});

export default HomeView;
