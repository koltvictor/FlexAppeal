import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import routineStore from "../stores/RoutineStore";
import styles from "../config/styles/ExerciseCardStyles";
import { auth, db } from "../app/firebase";
import favoritesStore from "../stores/FavoritesStore";
import Toast from "react-native-toast-message";
import { runInAction } from "mobx";

const ExerciseCard = ({
  exercise,
  isUpdatingRoutine,
  routineVariable,
  fromSavedRoutine,
}) => {
  const { addExercise } = routineStore;
  const [updatedRoutine, setUpdatedRoutine] = useState(routineVariable);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const routineId = routineVariable
    ? `${routineVariable.userId}_${routineVariable.name}`
    : null;

  const handleAddToRoutine = (exercise) => {
    if (isUpdatingRoutine) {
      const exerciseIndex = updatedRoutine.exercises.findIndex(
        (ex) => ex.id === exercise.id
      );

      if (exerciseIndex !== -1) {
        const updatedExercises = [...updatedRoutine.exercises];
        updatedExercises[exerciseIndex] = exercise;
        setUpdatedRoutine({ ...updatedRoutine, exercises: updatedExercises });

        db.collection("savedroutines")
          .doc(routineId)
          .update({
            exercises: updatedExercises,
          })
          .catch((error) => console.log(error));
      } else {
        const updatedExercises = [...updatedRoutine.exercises, exercise];
        setUpdatedRoutine({ ...updatedRoutine, exercises: updatedExercises });

        db.collection("savedroutines")
          .doc(routineId)
          .update({
            exercises: updatedExercises,
          })
          .catch((error) => console.log(error));
        Toast.show({
          type: "error",
          text1: "Error adding to routine",
        });
      }
    } else {
      addExercise(exercise);
      runInAction(() => {
        routineStore.reps.push(null);
        routineStore.time.push(null);
        routineStore.rest.push(null);
      });
    }
    Toast.show({
      type: "success",
      text1: "Exercise added to routine",
      visibilityTime: 2000,
      topOffset: 100,
    });
  };

  function formatInstructions(instructions) {
    if (!Array.isArray(instructions) || !instructions.length) {
      return "";
    }

    const formattedInstructions = instructions
      .map((sentence, index) => {
        return `${index + 1}) ${sentence.trim()}\n`;
      })
      .join("");

    return formattedInstructions;
  }

  const toggleFavorite = async () => {
    try {
      const uid = auth.currentUser.uid;
      const favoritesRef = db.collection("favorites").doc(uid);
      const favoritesDoc = await favoritesRef.get();

      let favoritesData = favoritesDoc.exists
        ? favoritesDoc.data()
        : { favexercises: [] };

      const exerciseExists = favoritesData.favexercises.includes(exercise.id);
      if (exerciseExists) {
        if (isFavorited) {
          favoritesData.favexercises = favoritesData.favexercises.filter(
            (id) => id !== exercise.id
          );
        }
      } else {
        if (!isFavorited) {
          favoritesData.favexercises = [
            ...favoritesData.favexercises,
            exercise,
          ];
        }
      }
      await favoritesRef.set(favoritesData);
      setIsFavorited(!isFavorited);
      favoritesStore.setFavorites(favoritesData.favexercises);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>{exercise.name}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons
              name={isFavorited ? "heart" : "heart-outline"}
              size={24}
              color={isFavorited ? "red" : "grey"}
            />
          </TouchableOpacity>
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
        {exercise.secondaryMuscles.length > 0 ? (
          <View style={styles.info}>
            <Text style={styles.label}>Secondary Muscles</Text>
            <Text style={styles.value}>
              {exercise.secondaryMuscles.join(", ") || "None"}
            </Text>
          </View>
        ) : (
          ""
        )}
        <Image
          source={{ uri: exercise.gifUrl }}
          alt="gif"
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.instructionsButton}
          onPress={() => setShowInstructions(!showInstructions)}
        >
          <Text style={styles.instructionsButtonText}>
            {showInstructions ? "Hide Instructions" : "Show Instructions"}
          </Text>
        </TouchableOpacity>

        {showInstructions ? (
          <Text style={styles.instructions}>
            {formatInstructions(exercise.instructions)}
          </Text>
        ) : null}

        {!fromSavedRoutine && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddToRoutine(exercise)}
          >
            <Text style={styles.buttonText}>Add to routine</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};
export default ExerciseCard;
