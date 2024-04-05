import { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import routineStore from "../stores/RoutineStore";
import styles from "../config/styles/ExerciseCardStyles";
import { auth, db } from "../app/firebase";
import favoritesStore from "../stores/FavoritesStore";

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
  const [showInstructions, setShowInstructions] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

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

  function formatInstructions(instructions) {
    if (!Array.isArray(instructions) || !instructions.length) {
      return ""; // Handle when instructions is not an array or the array is empty
    }

    // Process the array of instructions
    const formattedInstructions = instructions
      .map((sentence, index) => {
        return `${index + 1}) ${sentence.trim()}\n`; // Add number, period, and newline
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
      const exerciseName = exercise.name;
      const exerciseExists = favoritesData.favexercises.includes(exerciseName);
      if (exerciseExists) {
        if (isFavorited) {
          favoritesData.favexercises = favoritesData.favexercises.filter(
            (id) => id !== exerciseName
          );
        }
      } else {
        if (!isFavorited) {
          favoritesData.favexercises = [
            ...favoritesData.favexercises,
            exerciseName,
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
        {showModal && (
          <Animated.View
            style={[styles.modal, { opacity: fadeAnim, top: 0, left: 0 }]}
          >
            <Text style={styles.modalText}>Added to routine!</Text>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};
export default ExerciseCard;
