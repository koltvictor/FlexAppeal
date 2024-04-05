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

import Routes from "./src/app/routes/Routes";

const App = observer(() => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Provider>
          <UserProvider>
            <DataContextProvider>
              <RoutineProvider>
                <NavigationContainer>
                  <Routes />
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
