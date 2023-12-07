import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Tim from '../Components/./Avatars';

const LanguagePartnerRow = () => {
  return (
    <View style={styles.row}>
      <Tim />
      <View style={styles.textContainer}>
        <Text style={styles.name}>Tim</Text>
        <Text style={styles.details}>Plans on the weekend, taking a walk, coffee, ordering...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', // Aligns children horizontally
    alignItems: 'center', // Centers children vertically in the cross axis
    padding: 12, // Space inside the row
    // Add any additional styling for the row
  },
  partnerImage: {
    width: 50, // Set the image width
    height: 50, // Set the image height
    borderRadius: 25, // Make the image circular
    // Add any additional styling for the image
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 12, // Spacing between image and text
  },
  name: {
    fontSize: 18, // Set font size
    fontWeight: 'bold', // Make the name bold
    // Add any additional styling for the name text
  },
  details: {
    fontSize: 14, // Set font size
    color: 'gray', // Set text color
    // Add any additional styling for the details text
  },
});

export default LanguagePartnerRow;
