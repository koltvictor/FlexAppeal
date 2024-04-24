import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { options } from "../app/contexts/DataContext";
import ExerciseCard from "../components/ExerciseCard";
import useExerciseDetails from "../app/hooks/useExerciseDetails";
import styles from "../config/styles/ExerciseDetailsStyles";

const ExerciseDetailsScreen = ({ route }) => {
  const { exercise } = route.params;
  const { routine } = route.params;
  const [isUpdatingRoutine, setIsUpdatingRoutine] = useState(null);

  useEffect(() => {
    setIsUpdatingRoutine(route.params?.isUpdatingRoutine ?? null);
  }, [route.params]);

  const { isLoading } = useExerciseDetails(exercise.id, options);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ExerciseCard
        exercise={exercise}
        isUpdatingRoutine={isUpdatingRoutine}
        routineVariable={routine}
        fromSavedRoutine={route.params?.fromSavedRoutine ?? false}
      />
    </SafeAreaView>
  );
};

export default ExerciseDetailsScreen;
