import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./firebase";
import SplashScreen from "./src/app/SplashScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import ExercisesScreen from "./src/screens/ExercisesScreen";
import ExerciseDetailsScreen from "./src/screens/ExerciseDetailsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import Provider from "./src/app/Provider";
import { DataContextProvider } from "./src/app/DataContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [search, setSearch] = useState("");
  const [routine, setRoutine] = useState([]);

  const handleAddToRoutine = (exercise) => {
    setRoutine([...routine, exercise]);
    console.log("added", exercise, "to routine");
    console.log(routine);
  };

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider>
        <DataContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
              <Stack.Screen name="Splash">
                {(props) => (
                  <SplashScreen {...props} navigation={props.navigation} />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                initialParams={{
                  addToRoutine: handleAddToRoutine,
                  routine: routine,
                }}
              />
              <Stack.Screen
                name="Exercises"
                component={ExercisesScreen}
                options={({ route }) => ({
                  title: "Exercises",
                  exercises: route.params?.exercises || [],
                  addToRoutine: route.params.handleAddToRoutine,
                  routine: route.params.routine,
                })}
              />
              <Stack.Screen
                name="ExerciseDetails"
                component={ExerciseDetailsScreen}
              />
              <Stack.Screen name="Routine">
                {({ route }) => (
                  <RoutineScreen routine={route.params.routine} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </DataContextProvider>
      </Provider>
    </FirebaseAppProvider>
  );
}
