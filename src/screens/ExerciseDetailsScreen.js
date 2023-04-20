import React from "react";
import { SafeAreaView, Text } from "react-native";
import ExerciseCard from "../components/ExerciseCard";
import { useQuery } from "react-query";
import styles from "../config/styles/ExerciseDetailsStyles";

const ExerciseDetailsScreen = ({ route }) => {
  const { exercise } = route.params;

  const options = {
    headers: {
      "X-RapidAPI-Key": "9074bf701emsh2b8696dac91ac18p161ae0jsn7153acb84d2d",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  const { data: fetchedExercise, isLoading } = useQuery(["exercise"], () =>
    fetch(
      `https://exercisedb.p.rapidapi.com/exercises/exercise/${exercise.id}`,
      options
    ).then((res) => res.json())
  );

  const exerciseDetails = fetchedExercise || exercise;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ExerciseCard exercise={exerciseDetails} />
    </SafeAreaView>
  );
};

export default ExerciseDetailsScreen;
