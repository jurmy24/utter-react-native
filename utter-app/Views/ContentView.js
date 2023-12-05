// In React Native, you might use AsyncStorage or a state management library like Redux to persist state.
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingView from './OnboardingView';
import LoginView from './LoginView';
import TandemListView from './TandemListView';

const ContentView = () => {
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // You would retrieve the onboarding and logged-in status from AsyncStorage here
    const getStorageData = async () => {
      const onboardingStatus = await AsyncStorage.getItem('isOnboarding');
      const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
      setIsOnboarding(onboardingStatus !== 'false'); // Assuming 'false' is stored as a string
      setIsLoggedIn(loggedInStatus === 'true');
    };

    getStorageData();
  }, []);

  if (isOnboarding) {
    return <OnboardingView />;
  } else if (!isLoggedIn) {
    return <LoginView />;
  } else {
    return <TandemListView />;
  }
};

export default ContentView;
