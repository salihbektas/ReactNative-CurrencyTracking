import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home/Home';
import CurrencySelector from './src/screens/CurrencySelector/CurrencySelector';
import { CurrencyProvider } from './src/context/CurrencyContext';



const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <CurrencyProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CurrencySelector" component={CurrencySelector} />
        </Stack.Navigator>
      </NavigationContainer>
    </CurrencyProvider>
  );
}
