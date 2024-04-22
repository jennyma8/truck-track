import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';

const Profile = ({ navigation}) => {
  

  // Define state variables for user information
  const [companyName, setCompanyName] = useState('');
  const [driverName, setDriverName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gstHstNumber, setGstHstNumber] = useState('');
  const [userProfile, setUserProfile] = useState(null); // Define userProfile state variable

  // Load user profile from AsyncStorage when component mounts
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        // Retrieve user profile from AsyncStorage
        const userProfileJSON = await AsyncStorage.getItem('userProfile');
        if (userProfileJSON) {
          const userProfileData = JSON.parse(userProfileJSON);
          // Set user profile data to state variables
          setCompanyName(userProfileData.companyName || '');
          setDriverName(userProfileData.driverName || '');
          setEmail(userProfileData.email || '');
          setPhone(userProfileData.phone || '');
          setGstHstNumber(userProfileData.gstHstNumber || '');
          setUserProfile(userProfileData); // Set userProfile state
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };

    loadUserProfile();
  }, []); // Only run once when component mounts

  const handleLogout = () => {
    // Implement logout functionality if needed
    navigation.navigate('Login');
  };

  // Function to save user profile
  const saveProfile = async (username) => {
    try {
      // Construct the user profile object
      const userProfileData = {
        companyName,
        driverName,
        email,
        phone,
        gstHstNumber,
      };

      // Convert the user profile object to a JSON string
    const userProfileJSON = JSON.stringify(userProfileData);

    // Construct the AsyncStorage key with the username
    const userProfileKey = `userProfile_${username}`;

    // Save the user profile to AsyncStorage using the constructed key
    await AsyncStorage.setItem(userProfileKey, userProfileJSON);


      console.log('User profile saved successfully:', userProfileData);
      setUserProfile(userProfileData); // Update userProfile state
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  const goToForm = () => {
    navigation.navigate('Form', { userProfile });
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
        <Button title="Go to Form" onPress={goToForm} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </ScrollView>
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