import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Updates from 'expo-updates';
import MyForm from './Form';

//cd truck-track
//npx expo start

//expo updates automatic
//https://docs.expo.dev/versions/latest/sdk/updates/

export default function App() {
  // async function onFetchUpdateAsync() {
  //   try {
  //     const update = await Updates.checkForUpdateAsync();

  //     if (update.isAvailable) {
  //       await Updates.fetchUpdateAsync();
  //       await Updates.reloadAsync();
  //     }
  //   } catch (error) {
  //     // You can also add an alert() to see the error message in case of an error when fetching updates.
  //     alert(`Error fetching latest Expo update: ${error}`);
  //   }
  // }
  return (
    <View style={styles.container}>
      {/* <Button title="Fetch update" onPress={onFetchUpdateAsync} /> */}
      <Text></Text>
      <StatusBar style="auto" />
      <MyForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
