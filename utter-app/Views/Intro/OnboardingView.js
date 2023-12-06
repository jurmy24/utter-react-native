import React from 'react';
import { View, Text, ImageBackground, SafeAreaView } from 'react-native';
import Logo from '../../assets/images/Logo_utter.svg';
import { introStyles } from '../../assets/stylesheets/intro_styles';
import ArrowButton  from './../Components/ArrowButton'


const assetsPath = '../../assets/'
const OnboardingView = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require(assetsPath + 'images/slidingBackgroundWide.png')} 
      style={introStyles.background_style}
    >
      <SafeAreaView style={introStyles.safeArea}>
        <View style={introStyles.container}>
          <Logo style={introStyles.logo}/>
          <View style={introStyles.padding}></View>
            <View style={introStyles.content}>
              <View style={introStyles.textContainer}>
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
