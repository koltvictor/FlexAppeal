import { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import ExerciseCard from "../components/ExerciseCard";
import useExerciseDetails from "../app/hooks/useExerciseDetails";
import styles from "../config/styles/ExerciseDetailsStyles";

const ExerciseDetailsScreen = ({ route, fromSavedRoutine }) => {
  const { exercise } = route.params;
  const { routine } = route.params;
  const [isUpdatingRoutine, setIsUpdatingRoutine] = useState(null);

  useEffect(() => {
    setIsUpdatingRoutine(route.params?.isUpdatingRoutine ?? null);
  }, [route.params]);

  const options = {
    headers: {
      "X-RapidAPI-Key": "9074bf701emsh2b8696dac91ac18p161ae0jsn7153acb84d2d",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  const { exerciseDetails, isLoading } = useExerciseDetails(
    exercise.id,
    options
  );

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
