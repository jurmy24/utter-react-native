import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const logoHeight = screenHeight * 0.15; // The height of your logo

export const introStyles = StyleSheet.create({
  /* ------------------- General ----------------- */
  logoContainer: {
    height: screenWidth * 0.6 * (150 / 300), // Set the height based on the logo's aspect ratio
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0, // Adjust the top margin as per your design
    marginBottom: screenHeight * 0.1,
  },
  logo: {
    width: screenWidth * 0.5, // 50% of the screen width
    height: logoHeight, // the height calculated based on the screen
    resizeMode: "contain", // This ensures the SVG scales properly within the bounds
  },
  introPadding: {
    paddingVertical: screenHeight * 0.2,
  },
});
