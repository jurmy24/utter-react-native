import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // You can choose any icon set

const ArrowButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Icon name="ios-arrow-forward" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 64, // Set a fixed width for the circle
    height: 64, // Set a fixed height for the circle
    borderRadius: 32, // Half of the width and height to make it a perfect circle
    backgroundColor: "#5A5AF6", // Use a color that stands out for the button
    alignItems: "center",
    justifyContent: "center",
    // Add shadow or other styling as needed
  },
});

export default ArrowButton;
