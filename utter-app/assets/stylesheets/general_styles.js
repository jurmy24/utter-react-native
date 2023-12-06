import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const logoHeight = screenHeight*0.15; // The height of your logo

export const generalStyles = StyleSheet.create({

    background_style: { 
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        alignItems: 'center', 
        justifyContent: 'center' },
    
    safeArea: {
            flex: 1,
            backgroundColor: 'transparent',
            paddingTop: 120,
          },
    // Maybe this doesn't belong here
    languagePartnerListContainer: {
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius:  15,
            borderTopRightRadius: 15,
            // Add padding or margin as needed
          },
    // Maybe this doesn't belong here
    languagePartnersList: {
            marginTop: 30, // Adjust as needed
            backgroundColor: '#FFFFFF',
            // Add shadow or other styles as needed
          },
    });