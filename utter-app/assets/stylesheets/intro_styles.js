import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const logoHeight = screenHeight*0.15; // The height of your logo

export const introStyles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: 'transparent',
      },
      padding: {
        paddingHorizontal: 30,
        paddingVertical: 60,
      },

      content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 0, // Push content up from the bottom
        paddingHorizontal: 10,
        paddingVertical: 60,
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: logoHeight*0.5,
      },
      background_style: { 
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        alignItems: 'center', 
        justifyContent: 'center' },
      
      logo: {
        position: 'absolute',
        top: screenHeight * 0.15,
        width: screenWidth * 0.5,
        height: logoHeight, 
        resizeMode: 'contain',
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
      button: {
        backgroundColor: '#056ecf',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 3, // for Android shadow
        shadowColor: '#000000', // for iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      buttonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '600',
      },
    });