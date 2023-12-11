import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import LanguageRow from "./LanguageRow";
import { generalStyles } from '../../assets/stylesheets/general_styles';

const assetsPath = "../../assets/";

const LanguageSelection = () => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const navigation = useNavigation();

  // no language is selected by default
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageRowPress = (languageId) => {
    // Handle the logic when a language row is pressed
    setSelectedLanguage(languageId);
  };

  return (
    <ImageBackground
      source={require(assetsPath + "images/slidingBackgroundWide.png")}
      style={generalStyles.background_style}
    >
      <SafeAreaView
        style={{
          ...generalStyles.safeArea,
          paddingTop: Platform.OS === "android" ? 50 : 0,
          flex: 0,
        }}
      >
      </SafeAreaView>

      <ScrollView style={styles.languageListContainer}>

        <View style={{ flex: 1 }}>
          <View style={[generalStyles.column, {alignItems: 'left'}]}>
            <Text style={[generalStyles.header, { marginTop: 100 }]}>
              I want to practice
            </Text>
            <Text style={styles.mediumText}>Select language</Text>
          </View>
          
          <View style={styles.languageList}>
            {/* Language Rows */}
            <TouchableOpacity onPress={() => handleLanguageRowPress('us-flag')}>
              <LanguageRow 
                languageId="us-flag" 
                isSelected={selectedLanguage==='us-flag'}
            />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleLanguageRowPress('french-flag')}>
              <LanguageRow 
                languageId="french-flag"
                isSelected={selectedLanguage==='french-flag'}
              />
            </TouchableOpacity>

            {/* Add more LanguageRows here as needed */}
          </View>
        </View>

        {/* Next Button at the bottom */}
        <TouchableOpacity
          style={[
            styles.nextButton,
            { backgroundColor: selectedLanguage !== null ? '#536FFF' : '#CFD7FF' },
          ]}
          onPress={() => {/* Handle Next button press */}}
          disabled={selectedLanguage === null} // Disable the button if language is not selected
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  languageListContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: "100%",
    paddingHorizontal: 0,
    height: "100%",
    // Add padding or margin as needed
  },

  languageList: {
    marginTop: 10, // Adjust as needed
    backgroundColor: "#FFFFFF",
    // Add shadow or other styles as needed
  },

  mediumText: {
    fontSize: 17,
    marginBottom: 30,
    marginTop: 10,
  },

  nextButton: {
    borderRadius: 10,
    backgroundColor: '#CFD7FF',
    paddingVertical: 20,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12, // Adjust margin at the bottom
    justifyContent: 'flex-end',
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LanguageSelection;
