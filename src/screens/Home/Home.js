import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import RangeSelector from "../../component/RangeSelector";
import { useCurrencies, useCurrencyDispatch } from "../../context/CurrencyContext";
import colors from "../../Colors";


export default function Home({navigation, route}) {

  const [current, setCurrent] = useState([])
  const base = useCurrencies().base
  const target = useCurrencies().target
  const ready = useCurrencies().ready
  const range = useCurrencies().range
  const dispatch = useCurrencyDispatch()

  let starter, seperator

  switch (range) {
    case "week":
      starter = 6
      seperator = 1
      break;
    case "mounth":
      starter = 30
      seperator = 6
      break;
    case "6 mounth":
      starter = 180
      seperator = 36
      break;
    case "year":
      starter = 365
      seperator = 73
      break;
  }

  const labels = useMemo(() => {
    let arr = Array(starter+1)
    let milestone = starter
    const step = Math.floor(starter/5)
    for(let i = 0; i < starter ; i+=step){
      arr[i] = subtractDays(milestone).slice(5,10)
      milestone -= step
    }
    return arr
  }, [range])


  function subtractDays(numOfDays, date = new Date()) {
    date.setDate(date.getDate() - numOfDays);
  
    return date.toISOString().slice(0,10);
  }

  function saveData(receivedData){
    
    data = Object.keys(receivedData)
    
    for(i = 0; i < data.length; ++i){
      data[i] = receivedData[data[i]][target]
    }

    setCurrent(data)
  }

  function getir() {
    axios.get(`https://api.exchangerate.host/timeseries?start_date=${subtractDays(starter)}&end_date=${subtractDays(0)}&base=${base}&symbols=${target}`)
    .then(response => saveData(response.data.rates))
    .catch(error => console.error(error));
  }


  useEffect(() => {
    getir()
  }, [base, target, range])


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
      <View style={{flex: 2, width:"100%", backgroundColor: colors.white, justifyContent: "center", alignItems: "center"}}>
        <RangeSelector/>
      </View>

      <View style={{flex: 7, width:"100%", justifyContent: "center", alignItems: "center", paddingRight:10, backgroundColor: colors.white}}>

        {ready ? <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: current
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={Dimensions.get("window").height*0.7}

          yAxisInterval={seperator} // optional, defaults to 1
          withDots= {true}
          withOuterLines= {false}
          //verticalLabelRotation={90}
          segments={6}
          //xLabelsOffset={10}
          chartConfig={{
            backgroundGradientFrom: colors.white,
            backgroundGradientTo: colors.white,
            decimalPlaces: 3, // optional, defaults to 2dp
            color: () => colors.blue,
            labelColor: () => colors.blue,

            propsForDots: {
              r: "0"
            }
          }}
        /> : <ActivityIndicator size="large" /> }
      </View>

      <View style={{flex: 1, width:"100%", flexDirection: "row", backgroundColor: colors.white, justifyContent: "space-evenly", alignItems: "center", paddingBottom:20}} >
        
        <Text style={{color: colors.dark, fontSize: 20}}>{"1"}</Text>
        <Pressable style={{backgroundColor: colors.water, padding: 8, borderRadius: 12}}
                    onPress={() => navigation.navigate("CurrencySelector", {operation:"setBase"})}>
          <Text style={{color: colors.dark, fontSize: 20}}>{base}</Text>
        </Pressable>
        <Text style={{color: colors.dark, fontSize: 20}}>{"="}</Text>
        <Text style={{color: colors.dark, fontSize: 20}}>{ current && ready ? current[current.length-1] : "-------"}</Text>
        
        <Pressable style={{backgroundColor: colors.water, padding: 8, borderRadius: 12}}
                    onPress={() => navigation.navigate("CurrencySelector", {operation:"setTarget"})}>
          <Text style={{color: colors.dark, fontSize: 20}}>{target}</Text>
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
  