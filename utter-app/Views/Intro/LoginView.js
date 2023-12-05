import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Here you would handle the login logic, perhaps validating the user
    await AsyncStorage.setItem('isLoggedIn', 'true');
    // Navigate to the main app screen upon successful login
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('path-to-your-logo.png')} style={{ width: 300, height: 150 }} />
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {/* Add navigation to your Sign Up screen */}
      <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupTextBold}>Sign up</Text> now!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: screenWidth - 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#5A5AF6', // Use a similar blue color
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  signupText: {
    color: '#FFFFFF',
  },
  signupTextBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginView;
