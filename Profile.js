import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';

const Profile = () => {
  // Define state variables for user information
  const [companyName, setCompanyName] = useState('');
  const [driverName, setDriverName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gstHstNumber, setGstHstNumber] = useState('');

  // Function to save user profile
  const saveProfile = () => {
    // Save user profile to local storage or backend server
    // You can use AsyncStorage or any other storage mechanism
    // For simplicity, I'm just logging the user information here
    console.log('Saving profile:', { companyName, driverName, email, phone, gstHstNumber });
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.label}>Company Name</Text>
      <TextInput
        style={styles.input}
        value={companyName}
        onChangeText={text => setCompanyName(text)}
      />
      <Text style={styles.label}>Driver Name</Text>
      <TextInput
        style={styles.input}
        value={driverName}
        onChangeText={text => setDriverName(text)}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={text => setPhone(text)}
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>GST/HST Number</Text>
      <TextInput
        style={styles.input}
        value={gstHstNumber}
        onChangeText={text => setGstHstNumber(text)}
      />
      <Button title="Save Profile" onPress={saveProfile} />
    </View></ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
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
