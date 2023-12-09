import React from "react";
import { View, Text, Image } from "react-native";
import { generalStyles } from "../../assets/stylesheets/general_styles";

const Tim = () => {
  return (
    <View>
      <Image
        source={require("./../../assets/avatars/tim_avatar.png")} // Replace with the path to your image
        style={generalStyles.partnerImage}
      />
    </View>
  );
};

export default Tim;
