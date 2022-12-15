import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import currencies from "../../../currencies.json";
import colors from "../../Colors";
import { useCurrencies, useCurrencyDispatch } from "../../context/CurrencyContext";


export default function CurrencySelector({navigation, route}){

    const [input, setInput] = useState("")
    const [displayed, setDisplayed] = useState(currencies)
    const darkMode = useCurrencies().darkMode
    const dispatch = useCurrencyDispatch()

    useEffect(()=>{
        setDisplayed(currencies.filter(currency =>currency.includes(input.toUpperCase())))
    },[input])


    function onPress(item){
        
        dispatch({
            type:route.params.operation,
            base:item,
            target:item
        })
        navigation.navigate("Home", {operation: route.params.operation, currency:item})
    }

    const renderItem = ({ item, index }) => (

        <Pressable onPress={() => onPress(item)}
            style={{width:"25%", alignItems:"center", borderLeftColor: darkMode ? colors.water : colors.blue, borderLeftWidth: index%4 !== 0 ? 3:0}}>
            <Text style={{fontSize:24, color: darkMode ? colors.white : colors.dark}}>{item}</Text>
        </Pressable>

      );

    return(
        <View style={{flex:1, backgroundColor: darkMode ? colors.dark : colors.white}}>
            <View style={{height:100, width:"100%", justifyContent:"center", alignItems:"center"}}>
                <TextInput
                    style={{width:"50%", height:40, borderWidth:2, borderColor: darkMode ? colors.white : colors.dark, borderRadius: 8, color: darkMode ? colors.white : colors.dark, fontSize: 24, paddingLeft: 8}}
                    onChangeText={setInput}
                    placeholder="search"
                    placeholderTextColor={darkMode ? colors.white : colors.dark}
                    maxLength={3}
                />
            </View>
            <FlatList style={{flex:1, width:"100%"}}
                data = {displayed}
                renderItem = {renderItem}
                keyExtractor = {(_, index) => index}
                ItemSeparatorComponent={() => <View style={{height: 3, backgroundColor: darkMode ? colors.water : colors.blue}} />}
                numColumns={4}
            />

        </View>
    )
}