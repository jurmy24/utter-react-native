import React from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Logo from "../../assets/images/Logo_utter.svg";
import { introStyles } from "../stylesheets/intro_styles";
import ArrowButton from "./../Components/ArrowButton";
import { generalStyles } from "../stylesheets/general_styles";

const OnboardingView = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/images/slidingBackgroundWide.png")}
      style={generalStyles.background_style}
    >
      <SafeAreaView style={generalStyles.safeArea}>
        <View style={introStyles.introPadding}>
          <View style={introStyles.logoContainer}>
            <Logo style={introStyles.logo} />
          </View>

          <View style={generalStyles.column}>
            <Text style={styles.title}>
              Get your artificial language partner to practice speaking.
            </Text>
            <Text style={styles.subtitle}>
              With our AI-powered language partner you can learn your language
              like a pro.
            </Text>
            <ArrowButton
              onPress={() => navigation.navigate("Login")}
              style={styles.arrowButton}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "left",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "left",
    marginBottom: 30,
  },
  arrowButton: {
    alignSelf: "center", // This will center the button horizontally
  },
});

export default OnboardingView;
