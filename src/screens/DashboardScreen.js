import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, Text, SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./ProfileScreen";
import ExercisesScreen from "./ExercisesScreen";
import RoutineScreen from "./RoutineScreen";
import SavedRoutinesScreen from "./SavedRoutinesScreen";
import { DataContext } from "../app/contexts/DataContext";
import { auth } from "../app/firebase";
import styles from "../config/styles/DashboardStyles";

const Tab = createMaterialTopTabNavigator();

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <DataContext.Consumer>
      {({ exercises }) => (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Profile") {
                iconName = focused ? "person" : "person-outline";
              } else if (route.name === "Exercises") {
                iconName = focused ? "barbell" : "barbell-outline";
              } else if (route.name === "Routine") {
                iconName = focused ? "fitness" : "fitness-outline";
              } else if (route.name === "Saved Routines") {
                iconName = focused ? "save" : "save-outline";
              }

              return (
                <TouchableOpacity style={styles.tabIcon}>
                  <Ionicons name={iconName} size={size} color={color} />
                </TouchableOpacity>
              );
            },
            tabBarActiveTintColor: "#FFFFFF",
            tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
            tabBarStyle: {
              backgroundColor: "#000000",
              borderTopWidth: 0,
              elevation: 0,
              height: 100,
              paddingTop: 20,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            },
          })}
        >
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Exercises" component={ExercisesScreen} />
          <Tab.Screen name="Routine" component={RoutineScreen} />
          <Tab.Screen name="Saved Routines" component={SavedRoutinesScreen} />
        </Tab.Navigator>
      )}
    </DataContext.Consumer>
  );
}
