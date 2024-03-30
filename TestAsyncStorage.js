// import React, { useEffect } from 'react';
// import { View, Button, Alert, Text } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// const TestAsyncStorage = () => {
//   useEffect(() => {
//     // Example AsyncStorage usage
//     const storeData = async () => {
//       try {
//         await AsyncStorage.setItem('key', 'value');
//         const retrievedValue = await AsyncStorage.getItem('key');
//         console.log('Retrieved value:', retrievedValue);
//       } catch (error) {
//         console.error('Error storing data:', error);
//       }
//     };

//     storeData();
//   }, []);

//   const testAsyncStorage = async () => {
//     try {
//       // Save a key-value pair to AsyncStorage
//       await AsyncStorage.setItem('testKey', 'testValue');

//       // Retrieve the value based on the key
//       const retrievedValue = await AsyncStorage.getItem('testKey');
//       console.log('Retrieved value:', retrievedValue);
//       Alert.alert('Retrieved Value', `Value retrieved from AsyncStorage: ${retrievedValue}`);
//     } catch (error) {
//       console.error('Error testing AsyncStorage:', error);
//       Alert.alert('Error', 'An error occurred while testing AsyncStorage.');
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Testing AsyncStorage</Text>
//       <Button title="Test AsyncStorage" onPress={testAsyncStorage} />
//     </View>
//   );
// };

// export default TestAsyncStorage;