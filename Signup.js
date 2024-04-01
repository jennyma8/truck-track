import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    // Perform validation
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    try {
      // Check if username already exists
      const existingUser = await AsyncStorage.getItem(username);
      if (existingUser) {
        Alert.alert('Error', 'Username already exists. Please choose a different username.');
        return;
      }

      // Save user data to AsyncStorage
      const userData = { username, password };
      await AsyncStorage.setItem(username, JSON.stringify(userData));

      Alert.alert('Success', 'Account created successfully. You can now log in.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Error', 'An error occurred while signing up. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    marginBottom: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Signup;