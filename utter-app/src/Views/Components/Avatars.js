import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { generalStyles } from "../../assets/stylesheets/general_styles";

// Import all avatar images
const avatarImages = {
  "english-chatbot": require("./../../assets/avatars/tim_avatar.png"),
  "french-chatbot": require("./../../assets/avatars/claire_avatar.png"),
};

const flagImages = {
  "english-chatbot": require("./../../assets/images/us-flag.png"),
  "french-chatbot": require("./../../assets/images/french-flag.png"),
};

const Avatar = ({ chatbotId, size }) => {
  // Select the correct image based on the avatar prop
  const avatarImage = avatarImages[chatbotId];
  const flagImage = flagImages[chatbotId];
  const flagSize = size * 0.3; // Size of the flag, you can increase this value if you want the flag to be larger

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={avatarImage} // Replace with the path to your image
        style={[
          styles.avatar,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      />
      <View
        style={[
          styles.flagContainer,
          {
            width: flagSize,
            height: flagSize,
            // Position the flag relative to the bottom-right corner of the avatar
            bottom: -flagSize / 2, // Adjust this value to let the flag extend beyond the avatar's border
          },
        ]}
      >
        <Image
          source={flagImage} // Replace with the actual path to your flag image
          style={[
            styles.flag,
            {
              width: flagSize,
              height: flagSize,
              borderRadius: flagSize / 2,
              borderWidth: 1, // Width of the border
              borderColor: "#e1e6ed", // Color of the border
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    resizeMode: "cover",
    backgroundColor: "#a2beeb",
  },
  flagContainer: {
    position: "absolute",
    overflow: "hidden", // Ensures the image is cropped into a circle
  },
  flag: {
    resizeMode: "cover",
  },
});

export default Avatar;
