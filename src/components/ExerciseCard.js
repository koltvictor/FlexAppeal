import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import routineStore from "../app/RoutineStore";

const ExerciseCard = ({ exercise }) => {
  const { routine, addExercise } = routineStore;

  const handleAddToRoutine = (exercise) => {
    addExercise(exercise);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{exercise.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.label}>Target Muscle</Text>
          <Text style={styles.value}>{exercise.target}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.label}>Equipment</Text>
          <Text style={styles.value}>{exercise.equipment}</Text>
        </View>
      </View>
      <Image
        source={{ uri: exercise.gifUrl }}
        alt={"gif"}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAddToRoutine(exercise)}
      >
        <Text style={styles.buttonText}>Add to routine</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    margin: 10,
    overflow: "hidden",
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: "auto",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
});

export default ExerciseCard;
