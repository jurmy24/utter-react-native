import React, { useState } from "react";
import { View, ImageBackground, SafeAreaView } from "react-native";
import OnboardingView from "./OnboardingView";
import Logo from "../../assets/images/Logo_utter.svg";
import LoginView from "./LoginView";
import { introStyles } from "../stylesheets/intro_styles";

const MainContainer = () => {
  const [currentScreen, setCurrentScreen] = useState("onboarding");

  const handleNavigationChange = (screen) => {
    setCurrentScreen(screen);
  };
  const assetsPath = "../../assets/";

  return (
    <ImageBackground
      source={require(assetsPath + "images/slidingBackgroundWide.png")}
      style={introStyles.background_style}
    >
      <SafeAreaView style={introStyles.safeArea}>
        <View style={introStyles.container}>
          <Logo style={introStyles.logo} />
          {currentScreen === "onboarding" && (
            <OnboardingView onNavigate={handleNavigationChange} />
          )}
          {currentScreen === "login" && (
            <LoginView onNavigate={handleNavigationChange} />
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default MainContainer;
