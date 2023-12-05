import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpeakerView from './SpeakerView';
import ChatView from './ChatView';

const ChatOrCallDirect = () => {
  const [isInCall, setIsInCall] = useState(false);

  useEffect(() => {
    // Similar to ContentView, you'd retrieve the call status from AsyncStorage
    const getCallStatus = async () => {
      const callStatus = await AsyncStorage.getItem('isInCall');
      setIsInCall(callStatus === 'true');
    };

    getCallStatus();
  }, []);

  return isInCall ? <SpeakerView /> : <ChatView />;
};

export default ChatOrCallDirect;
