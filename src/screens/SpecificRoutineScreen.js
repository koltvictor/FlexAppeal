import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SpecificRoutineItem from "../components/SpecificRoutineItem";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "white",
  },
  exerciseContainer: {
    marginTop: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cccccc",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 16,
  },
  timerButton: {
    backgroundColor: "#007aff",
    padding: 8,
    borderRadius: 8,
  },
  timerButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  repsContainer: {
    marginTop: 8,
  },
  repsText: {
    fontSize: 16,
  },
});
