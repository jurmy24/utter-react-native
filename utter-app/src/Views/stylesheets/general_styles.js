import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const logoHeight = screenHeight * 0.15; // The height of your logo

export const generalStyles = StyleSheet.create({
  background_style: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },

  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
  },

  row: {
    flexDirection: "row", // Aligns children horizontally
    alignItems: "center", // Centers children vertically in the cross axis
    padding: 12, // Space inside the row
    justifyContent: "space-between",
  },

  column: {
    flexDirection: "column", // Aligns children horizontally
    alignItems: "center", // Centers children vertically in the cross axis
    paddingHorizontal: 25,
    justifyContent: "space-between",
    // Add any additional styling for the row
  },
  header: {
    // For the header title in Home and Chat View
    fontSize: 20,
  },
});
