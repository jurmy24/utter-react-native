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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 0, // Push content up from the bottom
        paddingHorizontal: 10,
        paddingVertical: 60,
      },
      textContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 50,
      },
      title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'left',
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'left',
      },

  /* ------------------- Login View Related ----------------- */

      loginButton: {
        backgroundColor: '#5A5AF6', // Use a similar blue color
        padding: 12,
        borderRadius: 8,
      },
      loginButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
      },
      signupText: {
        color: '#FFFFFF',
      },
      signupTextBold: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
      },
      input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: screenWidth - 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
      },

  /* ------------------- General ----------------- */

      logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: logoHeight*0.5,
      },
        
      logo: {
        position: 'absolute',
        top: screenHeight * 0.15,
        width: screenWidth * 0.5,
        height: logoHeight, 
        resizeMode: 'contain',
      },
    });