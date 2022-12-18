import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import RangeSelector from "../../component/RangeSelector";
import { useCurrencies, useCurrencyDispatch } from "../../context/CurrencyContext";
import colors from "../../Colors";
import ModeSwitch from "../../component/ModeSwitch";
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home({navigation, route}) {

  const [current, setCurrent] = useState([])
  const [appIsReady, setAppIsReady] = useState(false)
  const base = useCurrencies().base
  const target = useCurrencies().target
  const ready = useCurrencies().ready
  const range = useCurrencies().range
  const darkMode = useCurrencies().darkMode
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
    .catch(error => {
      console.error(error)
      alert("database could not be reached")
    });
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

  useEffect(() => {
    async function prepare() {
      let configs
      try {
        configs = await AsyncStorage.getItem('configs')
        configs = configs != null ? JSON.parse(configs) : null
      } catch (e) {
        console.warn(e);
      } finally {
        if(configs)
          dispatch({
            type: "load",
            base: configs.base,
            target: configs.target,
            range: configs.range,
            darkMode: configs.darkMode
          })
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  

  if (!appIsReady) {
    return null;
  }


  return (
    <View style={styles.container(darkMode)}
    onLayout={onLayoutRootView} >
      <StatusBar style={ darkMode ? "light" : "dark"} />
      <View style={styles.dashboard}>
        <ModeSwitch/>
        <RangeSelector/>
      </View>

      <View style={styles.chart}>

        {ready ? <LineChart
          data={{
            labels: labels,
            datasets: [{data: current}]
          }}
          width={Dimensions.get("window").width}
          height={Dimensions.get("window").height*0.7}
          yAxisInterval={seperator}
          withDots= {true}
          withOuterLines= {false}
          segments={6}
          chartConfig={{
            backgroundGradientFrom: darkMode ? colors.dark : colors.white,
            backgroundGradientTo: darkMode ? colors.dark : colors.white,
            decimalPlaces: 3,
            color: () => darkMode ? colors.water : colors.blue,
            labelColor: () => darkMode ? colors.water : colors.blue,

            propsForDots: {
              r: "0"
            }
          }}
        /> : <ActivityIndicator size="large" /> }
      </View>

      <View style={styles.buttomSide} >
        
        <Text style={styles.text(darkMode)}>{"1"}</Text>
        <Pressable style={styles.currency(darkMode)}
                    onPress={() => navigation.navigate("CurrencySelector", {operation:"setBase"})}>
          <Text style={styles.text(darkMode)}>{base}</Text>
        </Pressable>
        <Text style={styles.text(darkMode)}>{"="}</Text>
        <Text style={styles.text(darkMode)}>{ current && ready ? current[current.length-1] : "-------"}</Text>
        
        <Pressable style={styles.currency(darkMode)}
                    onPress={() => navigation.navigate("CurrencySelector", {operation:"setTarget"})}>
          <Text style={styles.text(darkMode)}>{target}</Text>
        </Pressable>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: (darkMode) =>({
      flex: 1,
      backgroundColor: darkMode ? colors.dark : colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    }),

    dashboard: {
      flex: 3,
      width:"100%",
      justifyContent: "center",
      alignItems: "center"
    },

    chart: {
      flex: 7,
      width:"100%",
      justifyContent: "center",
      alignItems: "center",
      paddingRight:10
    },

    buttomSide: {
      flex: 1,
      width:"100%",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingBottom:20
    },

    text: (darkMode) => ({
      color: darkMode ? colors.white : colors.dark,
      fontSize: 20
    }),

    currency: (darkMode) => ({
      backgroundColor: darkMode ? colors.blue : colors.water,
      padding: 8,
      borderRadius: 12
    })
  });