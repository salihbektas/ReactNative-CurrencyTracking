import { Pressable, StyleSheet, Text, View } from 'react-native'
import colors from '../Colors'
import { useCurrencies, useCurrencyDispatch } from '../context/CurrencyContext'

export default function RangeSelector() {
  const selectedRange = useCurrencies().range
  const darkMode = useCurrencies().darkMode
  const dispatch = useCurrencyDispatch()

  function onPress(range) {
    dispatch({
      type: 'setRange',
      range: range
    })
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => onPress('week')}>
        <Text style={styles.text(selectedRange === 'week', darkMode)}>week</Text>
      </Pressable>
      <Pressable onPress={() => onPress('month')}>
        <Text style={styles.text(selectedRange === 'month', darkMode)}>month</Text>
      </Pressable>
      <Pressable onPress={() => onPress('6 month')}>
        <Text style={styles.text(selectedRange === '6 month', darkMode)}>6 month</Text>
      </Pressable>
      <Pressable onPress={() => onPress('year')}>
        <Text style={styles.text(selectedRange === 'year', darkMode)}>year</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingTop: 8
  },

  text: (isSelected, darkMode) => ({
    color: isSelected ? (darkMode ? colors.water : colors.blue) : darkMode ? colors.white : colors.dark,
    fontSize: 20,
    fontWeight: '500'
  })
})
