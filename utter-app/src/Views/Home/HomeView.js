import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LanguagePartnerRow from "./LanguagePartnerRow";
import { generalStyles } from "../../assets/stylesheets/general_styles";

const assetsPath = "../../assets/";

const HomeView = () => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const navigation = useNavigation(); // This hook is provided by React Navigation

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
