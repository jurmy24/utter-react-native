import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Language from "../Components/Languages";
import { generalStyles } from "../../assets/stylesheets/general_styles";

const LanguageRow = ({ languageId}) => {
  const languageName = languageId === "french-flag" ? "French" : "English";

  return (
    <View style={styles.languageContainer}>
      <View style={generalStyles.row}>
        <Language languageId={languageId} size={40} />
        <View style={styles.textContainer}>
          <Text style={styles.language}>{languageName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B7B7B7',
    padding: 10,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10
  },
  language: {
    fontSize: 17, // Set font size
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 12, // Spacing between image and text
    paddingLeft: 8
  }
});

export default LanguageRow;