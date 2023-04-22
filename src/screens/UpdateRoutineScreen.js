import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { db } from "../app/firebase";
import { useNavigation } from "@react-navigation/native";
// import styles from "../config/styles/UpdateRoutineStyles";

function UpdateRoutineScreen({ route }) {
  const { routine } = route.params;
  const [updatedRoutine, setUpdatedRoutine] = useState(routine);
  let navigation = useNavigation();
  const isUpdatingRoutine = true;

  const handleDeleteExercise = (index) => {
    const exercises = [...updatedRoutine.exercises];
    exercises.splice(index, 1);
    setUpdatedRoutine({ ...updatedRoutine, exercises });
  };

  const handleAddExercise = () => {
    navigation.navigate("Exercises", { isUpdatingRoutine });
  };

  const handleUpdateExercise = (index, name, sets) => {
    const exercises = [...updatedRoutine.exercises];
    exercises[index] = { name, sets };
    setUpdatedRoutine({ ...updatedRoutine, exercises });
  };

  const handleSaveChanges = async () => {
    try {
      const savedRoutineRef = db.collection("savedroutines").doc(routine.id);
      await savedRoutineRef.set(updatedRoutine);
    } catch (error) {
      console.error("Error updating routine: ", error);
    }
  };

  return (
    <View>
      <Text>{routine.name}</Text>
      {updatedRoutine.exercises.map((exercise, index) => (
        <View key={index}>
          <Text>{exercise.name}</Text>
          <Text>{exercise.reps}</Text>
          <TouchableOpacity onPress={() => handleDeleteExercise(index)}>
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleUpdateExercise(index, exercise.name, exercise.sets)
            }
          >
            <Text>Update</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={handleAddExercise}>
        <Text>+ Add Exercise</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSaveChanges}>
        <Text>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UpdateRoutineScreen;
