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
            paddingTop: 0,
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

    divider: {
            height: 1,
            backgroundColor: 'lightgray',
            marginHorizontal: 15,
          },
        
    addButton: {
            position: 'absolute',
            right: 15,
            top: 65,
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: '#5A5AF6',
            justifyContent: 'center',
            alignItems: 'center',
          },

    circularButtonText: {
            fontSize: 24,
            color: 'white',
          },

    languagePartnerTextContainer: {
            width: screenWidth,
            justifyContent: 'center',
            marginLeft: 12, // Spacing between image and text
          },

    wrappedText: {
      flexWrap: 'wrap',
      fontSize: 14, // Set font size
      color: 'gray', // Set text color
          },

    partnerImage: {
            width: 50, // Set the image width
            height: 50, // Set the image height
            borderRadius: 25, // Make the image circular
            // Add any additional styling for the image
          },
              });