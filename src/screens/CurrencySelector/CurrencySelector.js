import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import currencies from "../../../currencies.json";


export default function CurrencySelector({navigation, route}){



    const renderItem = ({ item }) => (

        <Pressable onPress={() => navigation.navigate("Home", {operation: route.params.operation, currency:item})}
            style={{width:"25%", alignItems:"center"}}>
            <Text style={{fontSize:16}}>{item}</Text>
        </Pressable>

      );

    return(
        <View style={{flex:1}}>
            <View style={{height:100}}></View>
            <FlatList style={{flex:1, width:"100%"}}
                data = {currencies}
                renderItem = {renderItem}
                keyExtractor = {(_, index) => index}
                numColumns={4}
            />

        </View>
    )
}