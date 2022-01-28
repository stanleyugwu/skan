import { ActivityIndicator } from "react-native";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Persistor, persistStore } from "redux-persist";
import store from "./store";

// A persistor for redux store
const storePersistor: Persistor = persistStore(store);

const Loader: JSX.Element = (
  <ActivityIndicator
    animating
    size={50}
    style={{
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginVertical: "auto",
      marginHorizontal: "auto",
    }}
  />
);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate persistor={storePersistor} loading={Loader}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar backgroundColor="#23036A" style="light" />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}
