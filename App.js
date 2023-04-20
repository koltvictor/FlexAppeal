import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./src/app/firebase";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import ExercisesScreen from "./src/screens/ExercisesScreen";
import ExerciseIndexScreen from "./src/screens/ExerciseIndexScreen";
import ExerciseDetailsScreen from "./src/screens/ExerciseDetailsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import UpdateProfileScreen from "./src/screens/UpdateProfileScreen";
import RoutineScreen from "./src/components/RoutineItem";
import SavedRoutinesScreen from "./src/screens/SavedRoutinesScreen";
import SpecificRoutineScreen from "./src/screens/SpecificRoutineScreen";
import Provider from "./src/app/providers/Provider";
import { UserProvider } from "./src/app/contexts/UserContext";
import { DataContextProvider } from "./src/app/contexts/DataContext";
import { RoutineProvider } from "./src/app/contexts/RoutineContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import TargetsScreen from "./src/screens/TargetsScreen";

const Stack = createNativeStackNavigator();

const App = observer(() => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider>
        <UserProvider>
          <DataContextProvider>
            <RoutineProvider>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Splash">
                  <Stack.Screen name="Splash" options={{ headerShown: false }}>
                    {(props) => (
                      <SplashScreen {...props} navigation={props.navigation} />
                    )}
                  </Stack.Screen>
                  <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Exercises"
                    component={ExercisesScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ExerciseIndexScreen"
                    component={ExerciseIndexScreen}
                    options={{
                      title: "",
                      headerStyle: {
                        backgroundColor: "black",
                      },
                      headerTitleStyle: {
                        display: "none",
                      },
                    }}
                  />
                  <Stack.Screen
                    name="TargetsScreen"
                    component={TargetsScreen}
                    options={{
                      title: "",
                      headerStyle: {
                        backgroundColor: "black",
                      },
                      headerTitleStyle: {
                        display: "none",
                      },
                    }}
                  />
                  <Stack.Screen
                    name="ExerciseDetails"
                    component={ExerciseDetailsScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Routine"
                    component={RoutineScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Saved Routines"
                    component={SavedRoutinesScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Update Profile"
                    component={UpdateProfileScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Specific Routine"
                    component={SpecificRoutineScreen}
                    options={{
                      title: "",
                      headerStyle: {
                        backgroundColor: "black",
                      },
                      headerTitleStyle: {
                        display: "none",
                      },
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </RoutineProvider>
          </DataContextProvider>
        </UserProvider>
      </Provider>
    </FirebaseAppProvider>
  );
});

export default App;
