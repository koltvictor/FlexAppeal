import React from "react";
import { TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./ProfileScreen";
import ExercisesScreen from "./ExercisesScreen";
import RoutineScreen from "./RoutineScreen";
import SavedRoutinesScreen from "./SavedRoutinesScreen";
import FavoritesScreen from "./FavoritesScreen";
import FriendsScreen from "./FriendsScreen";
import styles from "../config/styles/DashboardStyles";
import colors from "../config/colors";

const Tab = createMaterialTopTabNavigator();

export default function DashboardScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Exercises") {
            iconName = focused ? "barbell" : "barbell-outline";
          } else if (route.name === "Routine") {
            iconName = focused ? "fitness" : "fitness-outline";
          } else if (route.name === "Saved") {
            iconName = focused
              ? "arrow-down-circle"
              : "arrow-down-circle-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Friends") {
            iconName = focused ? "people" : "people-outline";
          }

          return (
            <TouchableOpacity style={styles.tabIcon}>
              <Ionicons name={iconName} size={25} color={color} />
            </TouchableOpacity>
          );
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
        tabBarStyle: {
          backgroundColor: colors.darkgrey,
          borderTopWidth: 0,
          elevation: 0,
          height: 100,
          paddingTop: 40,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Exercises" component={ExercisesScreen} />
      <Tab.Screen name="Routine" component={RoutineScreen} />
      <Tab.Screen name="Saved" component={SavedRoutinesScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
    </Tab.Navigator>
  );
}
