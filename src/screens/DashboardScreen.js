import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./ProfileScreen";
import ExercisesScreen from "./ExercisesScreen";
import RoutineScreen from "./RoutineScreen";
import SavedRoutinesScreen from "./SavedRoutinesScreen";
import { DataContext } from "../app/DataContext";
import { auth } from "../../firebase";

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <DataContext.Consumer>
      {({ exercises }) => (
        <Tab.Navigator>
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => navigation.navigate("UpdateProfile")}
                >
                  <Ionicons name="person" size={size} color={color} />
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="Exercises"
            component={ExercisesScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => navigation.navigate("Exercises")}
                >
                  <Ionicons name="barbell" size={size} color={color} />
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="Routine"
            component={RoutineScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => navigation.navigate("Routines")}
                >
                  <Ionicons name="fitness" size={size} color={color} />
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="Saved Routines"
            component={SavedRoutinesScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => navigation.navigate("SavedRoutines")}
                >
                  <Ionicons name="save" size={size} color={color} />
                </TouchableOpacity>
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </DataContext.Consumer>
  );
}
