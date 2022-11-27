import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [current, setCurrent] = useState("")
  const [base, setbase] = useState("USD")
  const [target, setTarget] = useState("TRY")

  function getir() {
    axios.get(`https://api.exchangerate.host/latest?base=${base}&symbols=${target}`)
    .then(response => setCurrent(response.data.rates[target]))
    .catch(error => console.error(error));
  }

  useEffect(() => {
    getir()
  }, [])


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{flex: 2, width:"100%", backgroundColor: "powderblue", justifyContent: "center", alignItems: "center"}}>
        <Text>Bu alanda grafik aralıkları seçimi olucak</Text>
      </View>

      <View style={{flex: 6, width:"100%", backgroundColor: "tomato", justifyContent: "center", alignItems: "center"}}>
        <Text>Bu alanda grafik olucak</Text>
      </View>

      <View style={{flex: 2, width:"100%", flexDirection: "row", backgroundColor: "seagreen", justifyContent: "space-evenly", alignItems: "center"}} >
        
        <Text>{"1"}</Text>
        <Text>{base}</Text>
        <Text>{"="}</Text>
        <Text>{current}</Text>
        <Text>{target}</Text>

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
