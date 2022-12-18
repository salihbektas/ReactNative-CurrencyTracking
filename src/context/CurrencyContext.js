import { createContext, useContext, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CurrencyContext = createContext(null);

const CurrencyDispatchContext = createContext(null);


export function CurrencyProvider({ children }) {
  const [states, dispatch] = useReducer(
    stateReducer,
    initialStates
  );


  return (
    <CurrencyContext.Provider value={states}>
      <CurrencyDispatchContext.Provider value={dispatch}>
        {children}
      </CurrencyDispatchContext.Provider>
    </CurrencyContext.Provider>
  );
}

export function useCurrencies() {
  return useContext(CurrencyContext);
}

export function useCurrencyDispatch() {
  return useContext(CurrencyDispatchContext);
}

function stateReducer(states, action) {
  switch (action.type) {
    case 'setBase': {
      AsyncStorage.setItem("configs", JSON.stringify({ ...states, base: action.base }))
      return { ...states, base: action.base, ready: false };
    }
    case 'setTarget': {
      AsyncStorage.setItem("configs", JSON.stringify({ ...states, target: action.target }))
      return { ...states, target: action.target, ready: false };
    }
    case 'setReady': {
      return { ...states, ready: action.ready };
    }
    case 'setRange': {
      AsyncStorage.setItem("configs", JSON.stringify({ ...states, range: action.range }))
      return { ...states, range: action.range, ready: false };
    }
    case 'setDarkMode': {
      AsyncStorage.setItem("configs", JSON.stringify({...states, darkMode: action.darkMode }))
      return {...states, darkMode: action.darkMode };
    }
    case 'load': {
      return {...states, base: action.base, target: action.target, range: action.range, darkMode: action.darkMode}
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialStates = {
  base: "USD",
  target: "EUR",
  ready: false,
  range: "week",
  darkMode: false
}