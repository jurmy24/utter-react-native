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

          partnerImageContainer: {
            width: 80,
            height: 80,
            backgroundColor: '#c2ceea',
            borderRadius: 100, // A large value to make it a circle
            overflow: 'hidden',
          },

          partnerImage: {
            flex: 1,
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          },

          flagContainer: {
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: 30,
            height: 30,
            borderRadius: 30 / 2, // Half of the width/height for a circular shape
            overflow: 'hidden',
          },
          flag: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            borderRadius: 30 / 2, // Match the borderRadius of the container
            borderWidth: 1,
            borderColor: 'white',
          },

    inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#FFFFFF',
          },

    input: {
            flex: 1,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 20,
            padding: 10,
            marginRight: 10,
            backgroundColor: 'white',
          },

    callButton: {
            backgroundColor: 'blue',
            borderRadius: 50,
            padding: 20,
          },

    callButtonText: {
            color: 'white',
            fontWeight: 'bold',
          },
              });