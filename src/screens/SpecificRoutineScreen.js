import { View, Text } from "react-native";
import React from "react";
import SpecificRoutineItem from "../components/SpecificRoutineItem";
import styles from "../config/styles/SpecificRoutineStyles";

export default function SpecificRoutineScreen({ route }) {
  const { routine } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{routine.name}</Text>
      <Text style={styles.title}>Cycles: {routine.numberOfCycles}</Text>
      {routine.exercises.map((exercise) => (
        <SpecificRoutineItem key={exercise.id} exercise={exercise} />
      ))}
    </View>
  );
}
