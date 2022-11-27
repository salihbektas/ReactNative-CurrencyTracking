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
      <StatusBar style="auto" />
      <View style={{flex: 2, width:"100%", backgroundColor: "powderblue", justifyContent: "center", alignItems: "center"}}>
        <Text>Bu alanda grafik aralıkları seçimi olucak</Text>
      </View>

      <View style={{flex: 6, width:"100%", backgroundColor: "tomato", justifyContent: "center", alignItems: "center"}}>
        <Text>Bu alanda grafik olucak</Text>
      </View>

      <View style={{flex: 2, width:"100%", flexDirection: "row", backgroundColor: "purple", justifyContent: "center", alignItems: "center"}} >
        <Button title="Getir" onPress={getir} />
        <Text>Open up App.js to start working on your app!</Text>

      </View>
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
