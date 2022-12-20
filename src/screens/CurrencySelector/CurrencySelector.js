import { useEffect, useState } from "react";
import { FlatList, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import currencies from "../../../currencies.json";
import colors from "../../Colors";
import { useCurrencies, useCurrencyDispatch } from "../../context/CurrencyContext";


export default function CurrencySelector({navigation, route}){

    const [input, setInput] = useState("")
    const [displayed, setDisplayed] = useState(currencies)
    const darkMode = useCurrencies().darkMode
    const base = useCurrencies().base
    const target = useCurrencies().target
    const dispatch = useCurrencyDispatch()

    useEffect(()=>{
        setDisplayed(currencies.filter(currency =>currency.includes(input.toUpperCase())))
    },[input])


    function onPress(item){
        if(base === item || target === item){
            navigation.goBack()
            return
        }
        
        dispatch({
            type:route.params.operation,
            base:item,
            target:item
        })
        navigation.navigate("Home", {operation: route.params.operation, currency:item})
    }

    const renderItem = ({ item, index }) => (

        <Pressable onPress={() => onPress(item)} style={styles.currencyCell(darkMode, index)}>
            <Text style={styles.text(darkMode)}>{item}</Text>
        </Pressable>

      );

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={styles.mainContainer(darkMode)}>
                <View style={styles.topSide}>
                    <TextInput
                        style={styles.textInput(darkMode)}
                        onChangeText={setInput}
                        placeholder="search"
                        placeholderTextColor={darkMode ? colors.white : colors.dark}
                        maxLength={3}
                    />
                </View>
                <FlatList style={styles.flatList}
                    data = {displayed}
                    renderItem = {renderItem}
                    keyExtractor = {(_, index) => index}
                    ItemSeparatorComponent={() => <View style={styles.seperator(darkMode)} />}
                    numColumns={4}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    mainContainer: darkMode => ({
        flex:1,
        backgroundColor: darkMode ? colors.dark : colors.white
    }),

    topSide: {
        height:100,
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    },

    textInput: darkMode => ({
        width:"50%",
        height:40,
        borderWidth:2,
        borderColor: darkMode ? colors.white : colors.dark,
        borderRadius: 8,
        color: darkMode ? colors.white : colors.dark,
        fontSize: 24,
        paddingLeft: 8
    }),

    currencyCell: (darkMode, index) => ({
        width:"25%",
        alignItems:"center",
        borderLeftColor: darkMode ? colors.water : colors.blue,
        borderLeftWidth: index % 4 !== 0 ? 3 : 0
    }),

    text: darkMode => ({
        fontSize:24,
        color: darkMode ? colors.white : colors.dark
    }),

    flatList: {
        flex:1,
        width:"100%"
    },

    seperator: darkMode => ({
        height: 3,
        backgroundColor: darkMode ? colors.water : colors.blue
    })

})