import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  function getir() {
    axios.get("https://api.exchangerate.host/latest")
    .then(response => console.log(response.data.rates))
    .catch(error => console.error(error));
  }


  return (
    <View style={styles.container}>
      <Button title="Getir" onPress={getir} />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
