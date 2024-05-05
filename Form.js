import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const Form = () => {
  const [companyName, setCompanyName] = useState('');
  const [driverName, setDriverName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gstHstNumber, setGstHstNumber] = useState('');

  const [layoverHours, setLayoverHours] = useState('');
  const [pickupDropCount, setPickupDropCount] = useState('');
  const [waitingTimeHours, setWaitingTimeHours] = useState('');
  const [startKm, setStartKm] = useState('');
  const [endKm, setEndKm] = useState('');
  const [gpsMilesDriven, setGpsMilesDriven] = useState('');
  const [locations, setLocations] = useState([{ deliverTo: '' }]);
  const [pickups, setPickups] = useState([{ pickupFrom: '' }]);

  const ratePerMile = 0.61;
  const layoverRate = 85;
  const pickupDropRate = 150;
  const waitingTimeRate = 20;
  const gstRate = 0.05;
  const qstRate = 0.09975;
  const earningsKm = parseInt(endKm) - parseInt(startKm);
  const earningsMiles = earningsKm * 0.621371;

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
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save data. Please try again later.');
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
      Alert.alert('Error', 'Failed to load data. Please try again later.');
    }
  };

  const handleSave = () => {
    // Save data when the user clicks the save button
    saveData();
    // Optionally, navigate to another screen or perform other actions
  };

  const addLocation = () => {
    setLocations([...locations, { deliverTo: '' }]);
  };

  const addPickup = () => {
    setPickups([...pickups, { pickupFrom: '' }]);
  };

  const calculateEarnings = () => {
    const earnings = earningsMiles * ratePerMile;
    const layoverEarnings = layoverHours * layoverRate;
    const pickupDropEarnings = pickupDropCount * pickupDropRate;
    const waitingTimeEarnings = waitingTimeHours * waitingTimeRate;
    const totalEarnings = earnings + layoverEarnings + pickupDropEarnings + waitingTimeEarnings;
    const gstAmount = totalEarnings * gstRate;
    const qstAmount = totalEarnings * qstRate;

    return {
      earnings: earnings.toFixed(2),
      gst: gstAmount.toFixed(2),
      qst: qstAmount.toFixed(2),
      total: (totalEarnings + gstAmount + qstAmount).toFixed(2),
    };
  };

  const earningsData = calculateEarnings();

  const generatePDF = async () => {
    try {
      let deliverToContent = '';
      locations.forEach((location, index) => {
        deliverToContent += `<p>Deliver to ${index + 1}: ${location.deliverTo}</p>`;
      });

      let pickupContent = '';
      pickups.forEach((pickup, index) => {
        pickupContent += `<p>Pickup ${index + 1}: ${pickup.pickupFrom}</p>`;
      });

      const htmlContent = `
        <h1>Time Sheet</h1>
        <p>Company Name: ${companyName}</p>
        <p>Driver Name: ${driverName}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>GST/HST #: ${gstHstNumber}</p>
        <p>Rate per Mile: $0.63</p>
        <p>${deliverToContent}<p>
        <p>${pickupContent}</p>
        <p>Layover: ${layoverHours}</p>
        <p>Pickup/Drop: ${pickupDropCount}</p>
        <p>Waiting Time (Hours): ${waitingTimeHours}</p>
        <b>Vehicle odometer:<b>
        <p>Start (km): ${startKm}</p>
        <p>End (km): ${endKm}</p>
        <p>Km Driven: ${earningsKm} = Miles driven: ${earningsMiles.toFixed(2)} </p>
        <p>GPS Total Miles Driven: ${gpsMilesDriven}</p>
        <p>Earnings: ${earningsData.earnings}</p>
        <p>GST: ${earningsData.gst}</p>
        <p>QST: ${earningsData.qst}</p>
        <p>Total Earnings: ${earningsData.total}</p>
      `;
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <View style={styles.form}>
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
          <Text>Vehicle odometer</Text>
          <TextInput
            style={styles.input}
            placeholder="Start (km)"
            value={startKm}
            onChangeText={text => setStartKm(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="End (km)"
            value={endKm}
            onChangeText={text => setEndKm(text)}
            keyboardType="numeric"
          />
          <Text>Miles Driven: {earningsMiles.toFixed(2)}</Text>
          <Text>GPS total miles driven</Text>
          <TextInput
            style={styles.input}
            value={gpsMilesDriven}
            onChangeText={text => setGpsMilesDriven(text)}
            keyboardType="numeric"
          />
          {locations.map((location, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Deliver to ${index + 1}`}
              value={location.deliverTo}
              onChangeText={text => {
                const newLocations = [...locations];
                newLocations[index].deliverTo = text;
                setLocations(newLocations);
              }}
            />
          ))}
          <Button title="+" onPress={addLocation} />
          {pickups.map((pickup, index) => (
            <View key={index}>
              <TextInput
                style={styles.input}
                placeholder={`Pickup From ${index + 1}`}
                value={pickup.pickupFrom}
                onChangeText={text => {
                  const newPickups = [...pickups];
                  newPickups[index].pickupFrom = text;
                  setPickups(newPickups);
                }}
              />
            </View>
          ))}
          <Button title="+" onPress={addPickup} />
          <TextInput
            style={styles.input}
            placeholder="Layover"
            value={layoverHours}
            onChangeText={text => setLayoverHours(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Pickup/Drop"
            value={pickupDropCount}
            onChangeText={text => setPickupDropCount(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Waiting Time (hours)"
            value={waitingTimeHours}
            onChangeText={text => setWaitingTimeHours(text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.table}>
          <Text style={styles.label}>Rate per Mile: $0.61</Text>
          <Text style={styles.label}>Earnings: $</Text>
          <Text>{earningsData.earnings}</Text>
          <Text style={styles.label}>GST: $</Text>
          <Text>{earningsData.gst}</Text>
          <Text style={styles.label}>QST: $</Text>
          <Text>{earningsData.qst}</Text>
          <Text style={styles.label}>Total Earnings: $</Text>
          <Text>{earningsData.total}</Text>
        </View>
        <Button title="Save" onPress={handleSave} />
        <Button title="Generate PDF & Share" onPress={generatePDF} />
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  table: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Form;
