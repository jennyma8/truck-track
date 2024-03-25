import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

//cd truck-track
//npx expo//

//add invoice # (truck number + driver name + trailer# + date)
//email to dispatch + driver

const MyForm = () => {
  const [companyName, setCompanyName] = useState('AME Solution Inc.');
  const [driverName, setDriverName] = useState('Ezzat Abou-Al-Mouna');
  const [gstHstNumber, setGstHstNumber] = useState('744456302RT0001');
  const [trip, setTrip] = useState('');
  const [layoverHours, setLayoverHours] = useState('');
  const [pickupDropCount, setPickupDropCount] = useState('');
  const [waitingTimeHours, setWaitingTimeHours] = useState('');
  const [startKm, setStartKm] = useState('');
  const [endKm, setEndKm] = useState('');

  const ratePerMile = 0.63;
  const layoverRate = 85;
  const pickupDropRate = 150;
  const waitingTimeRate = 20;
  const gstRate = 0.05;
  const qstRate = 0.09975;
  const earningsKm = parseInt(endKm) - parseInt(startKm);
  const earningsMiles = earningsKm * 0.621371;

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

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted!');
  };

  const earningsData = calculateEarnings();

  const generatePDF = async () => {
    try {
      const htmlContent = `
        <h1>Time Sheet</h1>
        <p>Company Name: ${companyName}</p>
        <p>Driver Name: ${driverName}</p>
        <p>GST/HST #: ${gstHstNumber}</p>
        <p>Rate per Mile: $0.63</p>
        <p>Layover: ${layoverHours}</p>
        <p>Pickup/Drop: ${pickupDropCount}</p>
        <p>Waiting Time (Hours): ${waitingTimeHours}</p>
        <p>Trip #: ${trip}</p>
        <p>Start (km): ${startKm}</p>
        <p>End (km): ${endKm}</p>
        <p>Miles:${earningsMiles} </p>
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
    <ScrollView>
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
          placeholder="GST/HST #"
          value={gstHstNumber}
          onChangeText={text => setGstHstNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Trip #"
          value={trip}
          onChangeText={text => setTrip(text)}
        />
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
        <Button title="Calculate" onPress={handleSubmit} />
      </View>
      <View style={styles.table}>
      <Text style={styles.label}>Company Name: </Text>
      <Text>{companyName}</Text>
        <Text style={styles.label}>Driver Name: </Text>
        <Text>{driverName}</Text>
        <Text style={styles.label}>GST/HST #: </Text>
        <Text>{gstHstNumber}</Text>
        <Text style={styles.label}>Rate per Mile: $0.63</Text>
        <Text style={styles.label}>Layover: {layoverHours}</Text>
        <Text style={styles.label}>Pickup/Drop: {pickupDropCount}</Text>
        <Text style={styles.label}>Waiting Time (Hours): {waitingTimeHours}</Text>
        <Text style={styles.label}>Trip #: {trip}</Text>
        <Text style={styles.label}>Start (km): {startKm}</Text>
        <Text style={styles.label}>End (km): {endKm}</Text>
        <Text style={styles.label}>Miles: </Text>
        <Text>{earningsMiles}</Text>
        <Text style={styles.label}>Earnings:</Text>
        <Text>{earningsData.earnings}</Text>
        <Text style={styles.label}>GST:</Text>
        <Text>{earningsData.gst}</Text>
        <Text style={styles.label}>QST:</Text>
        <Text>{earningsData.qst}</Text>
        <Text style={styles.label}>Total Earnings:</Text>
        <Text>{earningsData.total}</Text>
        
        
      </View>
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

export default MyForm;