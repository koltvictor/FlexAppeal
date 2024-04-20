import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./src/app/firebase";
import Provider from "./src/app/providers/Provider";
import { UserProvider } from "./src/app/contexts/UserContext";
import { DataContextProvider } from "./src/app/contexts/DataContext";
import { RoutineProvider } from "./src/app/contexts/RoutineContext";
import { observer } from "mobx-react-lite";
import Toast from "react-native-toast-message";
import { StatusBar } from "react-native";
import Routes from "./src/app/routes/Routes";
import * as SecureStore from "expo-secure-store";

const App = observer(() => {
  console.log(SecureStore.getItemAsync("userCredentials"));
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Provider>
          <UserProvider>
            <DataContextProvider>
              <RoutineProvider>
                <NavigationContainer>
                  <StatusBar barStyle="light-content" />
                  <Routes />
                  <Toast />
                </NavigationContainer>
              </RoutineProvider>
            </DataContextProvider>
          </UserProvider>
        </Provider>
      </FirebaseAppProvider>
    </GestureHandlerRootView>
  );
});

export default App;
