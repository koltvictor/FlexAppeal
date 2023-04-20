import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import routineStore from "../stores/RoutineStore";
import styles from "../config/styles/ExerciseCardStyles";

const ExerciseCard = ({ exercise }) => {
  const { routine, addExercise } = routineStore;
  const navigation = useNavigation();

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
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ExerciseCard;
