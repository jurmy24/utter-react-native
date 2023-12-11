import React from "react";
import { View, Image, StyleSheet } from "react-native";

const flagImages = {
  "us-flag": require("../../assets/images/us-flag.png"),
  "french-flag": require("./../../assets/images/french-flag.png"),
};

const Language = ({ languageId, size }) => {
  const flagImage = flagImages[languageId];

  return (
    <View style={styles.container}>
      <Image
        source={flagImage}
        style={[
          styles.flag,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 1,
            borderColor: "#e1e6ed",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 'auto', // Adjust as needed
    height: 'auto', // Adjust as needed
    overflow: "hidden", // Ensures the image is cropped into a circle
  },
  flag: {
    resizeMode: "cover",
  },
});

export default Language;
