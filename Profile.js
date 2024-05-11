import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [companyName, setCompanyName] = useState('');
  const [driverName, setDriverName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gstHstNumber, setGstHstNumber] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    // Load data from AsyncStorage when the component mounts
    loadData();
  }, []);

  const saveData = async () => {
    try {
      // Save data to AsyncStorage
      await AsyncStorage.setItem('companyName', companyName);
      await AsyncStorage.setItem('driverName', driverName);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('phone', phone);
      await AsyncStorage.setItem('gstHstNumber', gstHstNumber);
      Alert.alert('Success', 'Profile saved successfully.');
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again later.');
    }
  };

  const loadData = async () => {
    try {
      // Load data from AsyncStorage
      const savedCompanyName = await AsyncStorage.getItem('companyName');
      const savedDriverName = await AsyncStorage.getItem('driverName');
      const savedEmail = await AsyncStorage.getItem('email');
      const savedPhone = await AsyncStorage.getItem('phone');
      const savedGstHstNumber = await AsyncStorage.getItem('gstHstNumber');
      // Update state with loaded data
      setCompanyName(savedCompanyName || '');
      setDriverName(savedDriverName || '');
      setEmail(savedEmail || '');
      setPhone(savedPhone || '');
      setGstHstNumber(savedGstHstNumber || '');
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load profile data. Please try again later.');
    }
  };

  const goToForm = () => {
    // Navigate to the Form screen with route parameters
    navigation.navigate('Form', {
      companyName,
      driverName,
      email,
      phone,
      gstHstNumber,
    });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={companyName}
        onChangeText={text => setCompanyName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Driver Name"
        value={driverName}
        onChangeText={text => setDriverName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="GST/HST #"
        value={gstHstNumber}
        onChangeText={text => setGstHstNumber(text)}
      />
      <Button title="Save Profile" onPress={saveData} />
      <Button title="Go to Form" onPress={goToForm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Profile;
