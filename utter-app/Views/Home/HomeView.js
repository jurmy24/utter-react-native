import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Text, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LanguagePartnerRow from './LanguagePartnerRow';
import { generalStyles } from '../../assets/stylesheets/general_styles';

const assetsPath = '../../assets/'

const HomeView = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const navigation = useNavigation(); // This hook is provided by React Navigation

  return (

    <ImageBackground 
      source={require(assetsPath + 'images/slidingBackgroundWide.png')}
      style={generalStyles.background_style}
    >
    <SafeAreaView style={generalStyles.safeArea}>

      <ScrollView style={generalStyles.languagePartnerListContainer}>
        <View style={styles.languagePartnersList}>
          {/* This TouchableOpacity should navigate to the ChatView when pressed */}
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <LanguagePartnerRow style={{ paddingHorizontal: 15 }} />
          </TouchableOpacity>

          <View style={styles.divider} />
          {/* Add more LanguagePartnerRows here as needed */}
        </View>
      </ScrollView>
      
      {/* "+" Button at the top */}
      <TouchableOpacity style={styles.addButton} onPress={() => {/* Action for the "+" button */}}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  
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
  addButtonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default HomeView;
