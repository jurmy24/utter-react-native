import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Logo from "../../assets/images/Logo_utter.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { introStyles } from "../../assets/stylesheets/intro_styles";
import { generalStyles } from "../../assets/stylesheets/general_styles";

const screenWidth = Dimensions.get("window").width;

const assetsPath = "../../assets/";

const LoginView = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Here you would handle the login logic, perhaps validating the user
    await AsyncStorage.setItem("isLoggedIn", "true");
    // Navigate to the main app screen upon successful login
  };

  return (
    <ImageBackground
      source={require(assetsPath + "images/slidingBackgroundWide.png")}
      style={generalStyles.background_style}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Logo style={introStyles.logo} />
        <TextInput
          style={introStyles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
          autoCapitalize="none"
        />
        <TextInput
          style={introStyles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={introStyles.loginButton}
        >
          <Text style={introStyles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        {/* Add navigation to your Sign Up screen */}
        <Text style={introStyles.signupText}>
          Don't have an account?{" "}
          <Text style={introStyles.signupTextBold}>Sign up</Text> now!
        </Text>
      </View>
    </ImageBackground>
  );
};

export default LoginView;
