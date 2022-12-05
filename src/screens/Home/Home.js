import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useCurrencies, useCurrencyDispatch } from "../../context/StateContext";


export default function Home({navigation, route}) {

  const [current, setCurrent] = useState([])
  const base = useCurrencies().base
  const target = useCurrencies().target
  const ready = useCurrencies().ready
  const dispatch = useCurrencyDispatch()


  function subtractDays(numOfDays, date = new Date()) {
    date.setDate(date.getDate() - numOfDays);
  
    return date.toISOString().slice(0,10);
  }

  function getir() {
    axios.get(`https://api.exchangerate.host/timeseries?start_date=${subtractDays(5)}&end_date=${subtractDays(0)}&base=${base}&symbols=${target}`)
    .then(response => setCurrent(response.data.rates))
    .catch(error => console.error(error));
  }


  useEffect(() => {
    getir()
  }, [base, target])


  useEffect(() => {
    if(current.length!== 0)
      dispatch({
        type:"setReady",
        ready:true
      })
  }, [JSON.stringify(current)])
  


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{flex: 2, width:"100%", backgroundColor: "powderblue", justifyContent: "center", alignItems: "center"}}>
        <Text>Bu alanda grafik aralıkları seçimi olucak</Text>
      </View>

      <View style={{flex: 6, width:"100%", backgroundColor: "tomato", justifyContent: "center", alignItems: "center"}}>
        <Text>Bu alanda grafik olucak</Text>

        {ready ? <LineChart
          data={{
            labels: [subtractDays(5).slice(5,10), 
                     subtractDays(4).slice(5,10),
                     subtractDays(3).slice(5,10),
                     subtractDays(2).slice(5,10),
                     subtractDays(1).slice(5,10), 
                     subtractDays(0).slice(5,10)
                    ],
            datasets: [
              {
                data: [
                  current[subtractDays(5)][target],
                  current[subtractDays(4)][target],
                  current[subtractDays(3)][target],
                  current[subtractDays(2)][target],
                  current[subtractDays(1)][target],
                  current[subtractDays(0)][target],
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={300}

          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#000000",
            backgroundGradientFrom: "#999999",
            backgroundGradientTo: "#999999",
            decimalPlaces: 3, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(125, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "1",
              strokeWidth: "1",
              stroke: "#22a726"
            }
          }}
          bezier

        /> : <ActivityIndicator size="large" /> }
      </View>

      <View style={{flex: 2, width:"100%", flexDirection: "row", backgroundColor: "seagreen", justifyContent: "space-evenly", alignItems: "center"}} >
        
        <Text>{"1"}</Text>
        <Pressable style={{backgroundColor: "dodgerblue", padding: 8, borderRadius: 12}}
                    onPress={() => navigation.navigate("CurrencySelector", {operation:"setBase"})}>
          <Text>{base}</Text>
        </Pressable>
        <Text>{"="}</Text>
        <Text>{ current && ready ? current[subtractDays(0)][target] : "-------"}</Text>
        
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
  