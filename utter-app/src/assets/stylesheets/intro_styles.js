import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const logoHeight = screenHeight*0.15; // The height of your logo

export const introStyles = StyleSheet.create({

  /* ------------------- Onboarding View Related ----------------- */

      onboardingViewPadding: {
        paddingHorizontal: 30,
        paddingVertical: 60,
      },
      onboardingViewContent: {
        alignItems: 'center', // Center content horizontally
        paddingHorizontal: 30, // Add some horizontal padding for the text
      },
      titleContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 50,
      },
      title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'left',
        marginBottom: 20,
      },
      subtitle: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'left',
        marginBottom: 30,
      },
      arrowButton: {
        alignSelf: 'center', // This will center the button horizontally
      },

  /* ------------------- Login View Related ----------------- */

      loginButton: {
        width: screenWidth * 0.8, // Match the width with input fields
        paddingVertical: 12, // Vertical padding
        borderRadius: 25, // Rounder corners to match the inputs
        backgroundColor: '#5A5AF6', // Primary button color
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
        marginTop: 20, // Space from the inputs to button
      },
      loginButtonText: {
        color: '#FFFFFF', // White text color
        fontWeight: 'bold', // Bold font weight
        fontSize: 16, // Font size for button text
      },
      signupText: {
        color: '#FFFFFF', // White text color
        marginTop: 20, // Space from button to sign up text
        textAlign: 'center', // Center sign up text
      },
      
      signupTextBold: {
        fontWeight: 'bold', // Bold font weight for 'Sign up'
        textDecorationLine: 'underline', // Underlined 'Sign up' text
      },
      input: {
        height: 50,
        width: screenWidth * 0.8, // Set width to 80% of the screen width
        marginVertical: 10, // Add vertical margin for spacing between inputs
        paddingHorizontal: 15, // Horizontal padding inside the text input
        borderRadius: 25, // Rounder corners for the input fields
        borderWidth: 1,
        borderColor: '#ddd', // Light grey border color
        backgroundColor: '#FFF', // White background color for inputs
      },

  /* ------------------- General ----------------- */

  logoContainer: {
    height: screenWidth * 0.6 * (150 / 300), // Set the height based on the logo's aspect ratio
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: screenHeight * 0.1, // Adjust the top margin as per your design
  },
  logo: {
    width: screenWidth * 0.5, // 50% of the screen width
    height: logoHeight, // the height calculated based on the screen
    resizeMode: 'contain', // This ensures the SVG scales properly within the bounds
  },
    });