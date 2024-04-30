import routineStore from "../../stores/RoutineStore";
import { runInAction } from "mobx";
import { auth, db } from "../firebase";
import favoritesStore from "../../stores/FavoritesStore";
import Toast from "react-native-toast-message";

const { addExercise } = routineStore;

export const handleAddToRoutine = (
  exercise,
  isUpdatingRoutine,
  updatedRoutine,
  setUpdatedRoutine,
  routineId,
  uniqueId
) => {
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
    const exerciseWithKey = { ...exercise, key: uniqueId };
    addExercise(exerciseWithKey);
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

export const formatInstructions = (instructions) => {
  if (!Array.isArray(instructions) || !instructions.length) {
    return "";
  }

  const formattedInstructions = instructions
    .map((sentence, index) => {
      return `${index + 1}) ${sentence.trim()}\n`;
    })
    .join("");

  return formattedInstructions;
};

export const toggleFavorite = async (exercise, isFavorited, setIsFavorited) => {
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
        favoritesData.favexercises = [...favoritesData.favexercises, exercise];
      }
    }
    await favoritesRef.set(favoritesData);
    setIsFavorited(!isFavorited);
    favoritesStore.setFavorites(favoritesData.favexercises);
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
};
