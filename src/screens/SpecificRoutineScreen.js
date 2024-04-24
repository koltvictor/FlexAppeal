import { View, Text } from "react-native";
import React from "react";
import SpecificRoutineItem from "../components/SpecificRoutineItem";
import styles from "../config/styles/SpecificRoutineStyles";
import { ScrollView } from "react-native-gesture-handler";

export default function SpecificRoutineScreen({ route, fromSavedRoutine }) {
  const { routine } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{routine.name}</Text>
      <Text style={styles.title}>Cycles: {routine.numberOfCycles}</Text>
      <ScrollView>
        {routine.exercises.map((exercise) => (
          <SpecificRoutineItem key={exercise.id} exercise={exercise} />
        ))}
      </ScrollView>
    </View>
  );
}
