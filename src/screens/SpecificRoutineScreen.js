import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SpecificRoutineItem from "../components/SpecificRoutineItem";
import styles from "../config/styles/SpecificRoutineStyles";

export default function SpecificRoutineScreen({ route }) {
  const { routine } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{routine.name}</Text>
      {routine.exercises.map((exercise) => (
        <SpecificRoutineItem key={exercise.id} exercise={exercise} />
      ))}
    </View>
  );
}
