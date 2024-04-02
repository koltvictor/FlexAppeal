import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Animated } from "react-native";
import routineStore from "../stores/RoutineStore";
import styles from "../config/styles/ExerciseCardStyles";
import { db } from "../app/firebase";

const ExerciseCard = ({
  exercise,
  isUpdatingRoutine,
  routineVariable,
  fromSavedRoutine,
}) => {
  const { addExercise } = routineStore;
  const [updatedRoutine, setUpdatedRoutine] = useState(routineVariable);
  const [showModal, setShowModal] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const routineId = routineVariable
    ? `${routineVariable.userId}_${routineVariable.name}`
    : null;

  const handleAddToRoutine = (exercise) => {
    if (isUpdatingRoutine) {
      // Find the index of the exercise object in the updatedRoutine object
      const exerciseIndex = updatedRoutine.exercises.findIndex(
        (ex) => ex.id === exercise.id
      );

      // If the exercise object exists in the updatedRoutine object, update it with the new exercise object
      if (exerciseIndex !== -1) {
        const updatedExercises = [...updatedRoutine.exercises];
        updatedExercises[exerciseIndex] = exercise;
        setUpdatedRoutine({ ...updatedRoutine, exercises: updatedExercises });

        // Update the exercise in the database
        db.collection("savedroutines")
          .doc(routineId)
          .update({
            exercises: updatedExercises,
          })
          .catch((error) => console.log(error));
      } else {
        // Add the new exercise object to the updatedRoutine object
        const updatedExercises = [...updatedRoutine.exercises, exercise];
        setUpdatedRoutine({ ...updatedRoutine, exercises: updatedExercises });

        // Add the new exercise object to the database
        db.collection("savedroutines")
          .doc(routineId)
          .update({
            exercises: updatedExercises,
          })
          .catch((error) => console.log(error));
      }
    } else {
      // Add the exercise to the routine
      addExercise(exercise);
    }
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setShowModal(false);
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 500);
      });
    }
  }, [showModal]);

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
      <Image source={{ uri: exercise.gifUrl }} alt="gif" style={styles.image} />
      <Text>{exercise.instructions}</Text>
      {!fromSavedRoutine && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddToRoutine(exercise)}
        >
          <Text style={styles.buttonText}>Add to routine</Text>
        </TouchableOpacity>
      )}
      {showModal && (
        <Animated.View
          style={[styles.modal, { opacity: fadeAnim, top: 0, left: 0 }]}
        >
          <Text style={styles.modalText}>Added to routine!</Text>
        </Animated.View>
      )}
    </View>
  );
};
export default ExerciseCard;
