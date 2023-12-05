import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, Button } from 'react-native';
import Logo from '../../assets/images/Logo_utter.svg';
import { introStyles } from '../../assets/stylesheets/intro_styles';



const assetsPath = '../../assets/'
// const { width, height } = Dimensions.get('window'); // Destructure width and height

// const OnboardingView = ({ setIsOnboarding, navigation }) => {
const OnboardingView = ({navigation }) => {
  return (
    <ImageBackground 
      source={require(assetsPath + 'images/slidingBackgroundWide.png')} // Replace with your image path
      style={introStyles.background_style}
    >
      <Logo width={300} height={150} />
      <Text style={introStyles.font24_white_bold}>
        Get your artificial language partner to practice speaking.
      </Text>
      <Text style={introStyles.font18_white}>
        With our AI-powered language partner you can learn your language like a pro.
      </Text>
      <Button
      title="Go to Login"
      onPress={() => 
        {
        // setIsOnboarding(false);
        navigation.navigate('Login')
      }}
    />
    </ImageBackground>
  );
};

export default OnboardingView;
