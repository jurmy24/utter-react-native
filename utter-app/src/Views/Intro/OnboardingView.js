import React from "react";
import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import Logo from "../../assets/images/Logo_utter.svg";
import { introStyles } from "../../assets/stylesheets/intro_styles";
import ArrowButton from "./../Components/ArrowButton";
import { generalStyles } from "../../assets/stylesheets/general_styles";

const OnboardingView = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/images/slidingBackgroundWide.png")}
      style={generalStyles.background_style}
    >
      <SafeAreaView style={generalStyles.safeArea}>
        <View style={introStyles.logoContainer}>
          <Logo style={introStyles.logo} />
        </View>

        <View style={generalStyles.column}>
          <Text style={introStyles.title}>
            Get your artificial language partner to practice speaking.
          </Text>
          <Text style={introStyles.subtitle}>
            With our AI-powered language partner you can learn your language
            like a pro.
          </Text>
          <ArrowButton
            onPress={() => navigation.navigate("Login")}
            style={introStyles.arrowButton}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OnboardingView;
