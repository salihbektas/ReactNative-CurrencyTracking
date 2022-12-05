import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import currencies from "../../../currencies.json";
import { useCurrencyDispatch } from "../../context/StateContext";


export default function CurrencySelector({navigation, route}){

    const [input, setInput] = useState("")
    const [displayed, setDisplayed] = useState(currencies)
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

    const renderItem = ({ item }) => (

        <Pressable onPress={() => onPress(item)}
            style={{width:"25%", alignItems:"center"}}>
            <Text style={{fontSize:16}}>{item}</Text>
        </Pressable>

      );

    return(
        <View style={{flex:1}}>
            <View style={{height:100, width:"100%", justifyContent:"center", alignItems:"center"}}>
                <TextInput
                    style={{width:"50%", height:40, borderWidth:1}}
                    onChangeText={setInput}
                    placeholder="search"
                />
            </View>
            <FlatList style={{flex:1, width:"100%"}}
                data = {displayed}
                renderItem = {renderItem}
                keyExtractor = {(_, index) => index}
                numColumns={4}
            />

        </View>
    )
}