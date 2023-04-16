import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./ProfileScreen";
import ExercisesScreen from "./ExercisesScreen";
import RoutineScreen from "./RoutineScreen";
import { DataContext } from "../app/DataContext";

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});

export default function DashboardScreen() {
  const navigation = useNavigation();

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
            name="Routines"
            component={RoutineScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => navigation.navigate("AllExercises")}
                >
                  <Ionicons name="fitness" size={size} color={color} />
                </TouchableOpacity>
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </DataContext.Consumer>
  );
}
