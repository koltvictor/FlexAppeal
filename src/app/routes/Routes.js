import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../../screens/SplashScreen";
import LoginScreen from "../../screens/LoginScreen";
import SignupScreen from "../../screens/SignupScreen";
import IntroductionScreen from "../../screens/IntroductionScreen";
import WelcomeScreen from "../../screens/WelcomeScreen";
import DashboardScreen from "../../screens/DashboardScreen";
import ExercisesScreen from "../../screens/ExercisesScreen";
import ExerciseIndexScreen from "../../screens/ExerciseIndexScreen";
import ExerciseDetailsScreen from "../../screens/ExerciseDetailsScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import UpdateProfileScreen from "../../screens/UpdateProfileScreen";
import RoutineScreen from "../../components/RoutineItem";
import SavedRoutinesScreen from "../../screens/SavedRoutinesScreen";
import SpecificRoutineScreen from "../../screens/SpecificRoutineScreen";
import TargetsScreen from "../../screens/TargetsScreen";
import UpdateRoutineScreen from "../../screens/UpdateRoutineScreen";
import SharedRoutinesScreen from "../../screens/SharedRoutinesScreen";
import FavoritesScreen from "../../screens/FavoritesScreen";
import FavExerciseScreen from "../../screens/FavExerciseScreen";
import colors from "../../config/colors";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" options={{ headerShown: false }}>
        {(props) => <SplashScreen {...props} navigation={props.navigation} />}
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
        name="Introduction"
        component={IntroductionScreen}
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
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.navy,
          },
          headerTitleStyle: {
            display: "none",
          },
        }}
      />
      <Stack.Screen
        name="ExerciseIndexScreen"
        component={ExerciseIndexScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.navy,
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
            backgroundColor: colors.navy,
          },
          headerTitleStyle: {
            display: "none",
          },
        }}
      />
      <Stack.Screen
        name="ExerciseDetails"
        component={ExerciseDetailsScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.navy,
          },
          headerTitleStyle: {
            display: "none",
          },
        }}
      />
      <Stack.Screen
        name="Routine"
        component={RoutineScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Saved Routines"
        component={SavedRoutinesScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.navy,
          },
          headerTitleStyle: {
            display: "none",
          },
        }}
      />
      <Stack.Screen
        name="Shared Routines"
        component={SharedRoutinesScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.navy,
          },
          headerTitleStyle: {
            display: "none",
          },
        }}
      />
      <Stack.Screen
        name="Update Routine"
        component={UpdateRoutineScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.navy,
          },
          headerTitleStyle: {
            display: "none",
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Update Profile"
        component={UpdateProfileScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.navy,
          },
          headerTitleStyle: {
            display: "none",
          },
        }}
      />
      <Stack.Screen
        name="Specific Routine"
        component={SpecificRoutineScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.navy,
          },
          headerTitleStyle: {
            display: "none",
          },
        }}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.navy,
          },
          headerTitleStyle: {
            display: "none",
          },
        }}
      />
      <Stack.Screen
        name="FavExercise"
        component={FavExerciseScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.navy,
          },
          headerTitleStyle: {
            display: "none",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
