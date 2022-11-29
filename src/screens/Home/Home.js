import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function Home({navigation, route}) {

  const [current, setCurrent] = useState("")
  const [base, setBase] = useState("USD")
  const [target, setTarget] = useState("TRY")

  function getir() {
    axios.get(`https://api.exchangerate.host/latest?base=${base}&symbols=${target}`)
    .then(response => setCurrent(response.data.rates[target]))
    .catch(error => console.error(error));
  }

  useFocusEffect(()=>{
    if(route.params){
      if(route.params.operation === "setBase")
        setBase(route.params.currency)
      if(route.params.operation === "setTarget")
        setTarget(route.params.currency)
    }
  })

  useEffect(() => {
    getir()
  }, [base, target])


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
        <Pressable style={{backgroundColor: "dodgerblue", padding: 8, borderRadius: 12}}
                    onPress={() => navigation.navigate("CurrencySelector", {operation:"setBase"})}>
          <Text>{base}</Text>
        </Pressable>
        <Text>{"="}</Text>
        <Text>{current}</Text>
        <Pressable style={{backgroundColor: "dodgerblue", padding: 8, borderRadius: 12}}
                    onPress={() => navigation.navigate("CurrencySelector", {operation:"setTarget"})}>
          <Text>{target}</Text>
        </Pressable>
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
  