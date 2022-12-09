import { Pressable, Text, View } from "react-native"
import { useCurrencies, useCurrencyDispatch } from "../context/CurrencyContext"



export default function RangeSelector(){
    const selectedRange = useCurrencies().range
    const dispatch = useCurrencyDispatch()

    function onPress(range){
        dispatch({
            type: "setRange",
            range: range
        })
    }


    return(
        <View style={{flex: 1, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"}} >
            <Pressable style={{backgroundColor: selectedRange==="week" ? "firebrick" : "dodgerblue", paddingHorizontal: 8}}
                onPress={()=>onPress("week")}>
                <Text >week</Text>
            </Pressable>
            <Pressable style={{backgroundColor: selectedRange==="mounth" ? "firebrick" : "dodgerblue", paddingHorizontal: 8}}
                onPress={()=>onPress("mounth")}>
                <Text >mounth</Text>
            </Pressable>
            <Pressable style={{backgroundColor: selectedRange==="6 mounth" ? "firebrick" : "dodgerblue", paddingHorizontal: 8}}
                onPress={()=>onPress("6 mounth")}>
                <Text >6 mounth</Text>
            </Pressable>
            <Pressable style={{backgroundColor: selectedRange==="year" ? "firebrick" : "dodgerblue", paddingHorizontal: 8}}
                onPress={()=>onPress("year")}>
                <Text >year</Text>
            </Pressable>
            <Pressable style={{backgroundColor: selectedRange==="all" ? "firebrick" : "dodgerblue", paddingHorizontal: 8}}
                onPress={()=>onPress("all")}>
                <Text >all</Text>
            </Pressable>
        </View>
    )

}