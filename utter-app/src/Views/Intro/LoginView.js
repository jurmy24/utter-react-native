import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Logo from "../../assets/images/Logo_utter.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { introStyles } from "../stylesheets/intro_styles";
import { generalStyles } from "../stylesheets/general_styles";

const screenWidth = Dimensions.get("window").width;

const assetsPath = "../../assets/";

const LoginView = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={require(assetsPath + "images/slidingBackgroundWide.png")}
      style={generalStyles.background_style}
    >
      <SafeAreaView style={generalStyles.safeArea}>
        <View style={introStyles.introPadding}>
          <View style={introStyles.logoContainer}>
            <Logo style={introStyles.logo} />
          </View>
          <View style={generalStyles.column}>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
          {/* Add navigation to your Sign Up screen */}
          <Text style={styles.signupText}>
            Don't have an account?{" "}
            <Text style={styles.signupTextBold}>Sign up</Text> now!
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export const styles = StyleSheet.create({
  /* ------------------- Login View Related ----------------- */

  loginButton: {
    width: screenWidth * 0.9, // Match the width with input fields
    paddingVertical: 12, // Vertical padding
    borderRadius: 25, // Rounder corners to match the inputs
    backgroundColor: "#5A5AF6", // Primary button color
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
    marginTop: 20, // Space from the inputs to button
  },
  loginButtonText: {
    color: "#FFFFFF", // White text color
    fontWeight: "bold", // Bold font weight
    fontSize: 16, // Font size for button text
  },
  signupText: {
    color: "#FFFFFF", // White text color
    marginTop: 20, // Space from button to sign up text
    textAlign: "center", // Center sign up text
  },

  signupTextBold: {
    fontWeight: "bold", // Bold font weight for 'Sign up'
    textDecorationLine: "underline", // Underlined 'Sign up' text
  },
  input: {
    height: 50,
    width: screenWidth * 0.9, // Set width to 80% of the screen width
    marginVertical: 10, // Add vertical margin for spacing between inputs
    paddingHorizontal: 15, // Horizontal padding inside the text input
    borderRadius: 25, // Rounder corners for the input fields
    borderWidth: 1,
    borderColor: "#ddd", // Light grey border color
    backgroundColor: "#FFF", // White background color for inputs
  },
});

export default LoginView;
