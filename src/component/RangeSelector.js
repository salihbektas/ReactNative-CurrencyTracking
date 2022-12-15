import { Pressable, Text, View } from "react-native"
import colors from "../Colors"
import { useCurrencies, useCurrencyDispatch } from "../context/CurrencyContext"



export default function RangeSelector(){
    const selectedRange = useCurrencies().range
    const darkMode = useCurrencies().darkMode
    const dispatch = useCurrencyDispatch()

    function onPress(range){
        dispatch({
            type: "setRange",
            range: range
        })
    }


    return(
        <View style={{flex: 3, width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-evenly", paddingTop: 8}} >
            <Pressable style={{ paddingHorizontal: 8}}
                onPress={()=>onPress("week")}>
                <Text style={{color: selectedRange === "week" ? darkMode ? colors.water : colors.blue : darkMode ? colors.white : colors.dark, fontSize: 20}}>week</Text>
            </Pressable>
            <Pressable style={{ paddingHorizontal: 8}}
                onPress={()=>onPress("mounth")}>
                <Text style={{color: selectedRange === "mounth" ? darkMode ? colors.water : colors.blue : darkMode ? colors.white : colors.dark, fontSize: 20}}>mounth</Text>
            </Pressable>
            <Pressable style={{ paddingHorizontal: 8}}
                onPress={()=>onPress("6 mounth")}>
                <Text style={{color: selectedRange === "6 mounth" ? darkMode ? colors.water : colors.blue : darkMode ? colors.white : colors.dark, fontSize: 20}}>6 mounth</Text>
            </Pressable>
            <Pressable style={{ paddingHorizontal: 8}}
                onPress={()=>onPress("year")}>
                <Text style={{color: selectedRange === "year" ? darkMode ? colors.water : colors.blue : darkMode ? colors.white : colors.dark, fontSize: 20}}>year</Text>
            </Pressable>
        </View>
    )

}