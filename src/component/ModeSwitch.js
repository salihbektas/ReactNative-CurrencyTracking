import { Image, StyleSheet, Switch, View } from 'react-native'
import colors from '../Colors'
import { useCurrencies, useCurrencyDispatch } from '../context/CurrencyContext'

export default function ModeSwitch() {
  const darkMode = useCurrencies().darkMode
  const dispatch = useCurrencyDispatch()

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/sun.png')} style={styles.sunIcon(darkMode)} />

      <Switch
        thumbColor={darkMode ? colors.water : colors.dark}
        trackColor={{ true: colors.white }}
        onValueChange={() => dispatch({ type: 'setDarkMode', darkMode: !darkMode })}
        value={darkMode}
      />

      <Image source={require('../../assets/moon.png')} style={styles.moonIcon(darkMode)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 2, justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%', flexDirection: 'row' },

  sunIcon: (darkMode) => ({
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginLeft: 5,
    marginBottom: 5,
    tintColor: darkMode ? colors.white : colors.sun
  }),

  moonIcon: (darkMode) => ({
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
    tintColor: darkMode ? colors.water : colors.dark
  })
})
