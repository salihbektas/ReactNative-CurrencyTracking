import { createContext, useContext, useReducer } from "react";

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
      return { ...states, base: action.base, ready: false };
    }
    case 'setTarget': {
      return { ...states, target: action.target, ready: false };
    }
    case 'setReady': {
      return { ...states, ready: action.ready };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialStates = {
  base: "USD",
  target: "EUR",
  ready: false
}