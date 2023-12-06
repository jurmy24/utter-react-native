import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LanguagePartnerRow from './LanguagePartnerRow';

const HomeView = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation(); // This hook is provided by React Navigation

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.slidingBackground, { width: screenWidth }]}>
        {/* SlidingBackgroundView equivalent goes here */}
      </View>

      <ScrollView style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  slidingBackground: {
    // Style for your sliding background
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    // Add padding or margin as needed
  },
  languagePartnersList: {
    marginTop: 30, // Adjust as needed
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // Add shadow or other styles as needed
  },
  divider: {
    height: 1,
    backgroundColor: 'lightgray',
    marginHorizontal: 15,
  },
  addButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'blue', // Replace with your theme color
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 22,
    color: 'white',
  },
});

export default HomeView;
