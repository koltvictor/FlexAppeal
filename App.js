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
// import { useNavigation } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "react-query";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  // const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash">
              {(props) => (
                <SplashScreen {...props} navigation={props.navigation} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen
              name="Exercises"
              component={ExercisesScreen}
              options={({ route }) => ({
                title: "Exercises",
                headerShown: false,
                exercises: route.params?.exercises || [],
                search,
                setSearch,
                clicked,
                setClicked,
              })}
            />
            <Stack.Screen
              name="ExerciseDetails"
              component={ExerciseDetailsScreen}
            />
            {/* <Stack.Screen
            name="FavouriteRoutines"
            component={FavouriteRoutinesScreen}
          /> */}
            {/* <Stack.Screen name="AllRoutines" component={AllRoutinesScreen} /> */}
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </FirebaseAppProvider>
  );
}
