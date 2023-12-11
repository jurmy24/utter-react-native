import React from 'react';
import { View, Text, ImageBackground, SafeAreaView } from 'react-native';
import Logo from '../../assets/images/Logo_utter.svg';
import { introStyles } from '../../assets/stylesheets/intro_styles';
import ArrowButton  from './../Components/Buttons'
import { generalStyles } from '../../assets/stylesheets/general_styles';


const assetsPath = '../../assets/'
const OnboardingView = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require(assetsPath + 'images/slidingBackgroundWide.png')} 
      style={generalStyles.background_style}
    >
      <SafeAreaView style={generalStyles.safeArea}>
        <View style={introStyles.logoContainer}>
          <Logo style={introStyles.logo}/>
          <View style={introStyles.onboardingViewPadding}></View>
            <View style={introStyles.onboardingViewContent}>
              <View style={introStyles.titleContainer}>
                <Text style={introStyles.title}>
                  Get your artificial language partner to practice speaking.
                </Text>
                <Text style={introStyles.subtitle}>
                  With our AI-powered language partner you can learn your language like a pro.
                </Text>
              </View>
              <ArrowButton onPress={() => navigation.navigate('Login')} />
            </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OnboardingView;