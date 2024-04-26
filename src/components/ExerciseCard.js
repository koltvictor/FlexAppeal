import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import favoritesStore from "../stores/FavoritesStore";
import styles from "../config/styles/ExerciseCardStyles";
import {
  handleAddToRoutine,
  formatInstructions,
  toggleFavorite,
} from "../app/hooks/exerciseCardHelpers";

const ExerciseCard = ({
  exercise,
  isUpdatingRoutine,
  routineVariable,
  fromSavedRoutine,
}) => {
  const [updatedRoutine, setUpdatedRoutine] = useState(routineVariable);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const routineId = routineVariable
    ? `${routineVariable.userId}_${routineVariable.name}`
    : null;

  const handleAddToRoutineWrapper = () => {
    console.log("handleAddToRoutineWrapper called!");
    handleAddToRoutine(
      exercise,
      isUpdatingRoutine,
      updatedRoutine,
      setUpdatedRoutine,
      routineId
    );
  };

  useEffect(() => {
    const fetchedFaveIds = favoritesStore.favorites.map((ex) => ex.id);
    setIsFavorited(fetchedFaveIds.includes(exercise.id));
  }, [exercise.id, favoritesStore.favorites]); // Dependency array

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>{exercise.name}</Text>
          <TouchableOpacity
            onPress={() =>
              toggleFavorite(exercise, isFavorited, setIsFavorited)
            }
          >
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
            onPress={handleAddToRoutineWrapper}
          >
            <Text style={styles.buttonText}>Add to routine</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};
export default ExerciseCard;
