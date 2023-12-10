import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import MessageView from '../Chat/MessageView';
import { useNavigation } from '@react-navigation/native';
import { generalStyles } from '../../assets/stylesheets/general_styles';

const MessageInputContainer = () => {
    const navigation = useNavigation(); // This hook is provided by React Navigation
    const [text, setText] = useState('');

    const handleSend = () => {
      // Logic to send a message and update chat history
      // You would call something like your chat model's send function here
      setText('');
      // setChatMessages(updateYourChatHistory());
    };

    return (
        <View style={generalStyles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={generalStyles.input}
          placeholder="Type something..."
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Call')} style={generalStyles.callButton}>
            {/* Here above we should use the handleJoinCall funciton later */}
          <Text style={generalStyles.callButtonText}>Join Talk</Text>
        </TouchableOpacity>
      </View>
    );
};

export default MessageInputContainer;