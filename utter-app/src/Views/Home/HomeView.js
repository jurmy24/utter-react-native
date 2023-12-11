import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import LanguagePartnerRow from "./LanguagePartnerRow";
import { generalStyles } from "../../assets/stylesheets/general_styles";
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
        `http://130.229.177.235:3000/message-history/latest`,
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
      <SafeAreaView style={generalStyles.safeArea}>
        <ScrollView style={generalStyles.languagePartnerListContainer}>
          <View style={generalStyles.languagePartnersList}>
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

            <View style={generalStyles.divider} />
            {/* Add more LanguagePartnerRows here as needed */}
          </View>
        </ScrollView>

        {/* "+" Button at the top */}
        <TouchableOpacity
          style={generalStyles.addButton}
          onPress={() => {
            /* Action for the "+" button */
          }}
        >
          <Text style={generalStyles.circularButtonText}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeView;
