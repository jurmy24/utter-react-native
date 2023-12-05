import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const introStyles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: 'transparent',
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingVertical: 60,
      },
      background_style: { 
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        alignItems: 'center', 
        justifyContent: 'center' },
      
      logo: {
        width: screenWidth * 0.8,
        height: screenHeight * 0.1, 
        resizeMode: 'contain'
      },
      textContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
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