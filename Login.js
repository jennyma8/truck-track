import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignupPress = () => {
        navigation.navigate('Signup');
      };

    const handleLogin = async () => {
      // Perform validation
      if (!username || !password) {
        Alert.alert('Error', 'Please enter both username and password.');
        return;
      }
  
      try {
        // Retrieve user data from AsyncStorage
        const userData = await AsyncStorage.getItem(username);
        if (userData) {
          const { password: storedPassword } = JSON.parse(userData);
          if (password === storedPassword) {
            // Login successful, navigate to profile
            navigation.navigate('Profile', { username });
            return;
          }
        }
        // Invalid username or password
        Alert.alert('Error', 'Invalid username or password. Please try again.');
      } catch (error) {
        console.error('Error logging in:', error);
        Alert.alert('Error', 'An error occurred while logging in. Please try again later.');
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
        <Button title="Login" onPress={handleLogin} />
        <Button title="Sign Up" onPress={handleSignupPress} />
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
  
  export default Login;