import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import ExerciseCard from "../components/ExerciseCard";
import { useQuery } from "react-query";
// import { useNavigation } from "@react-navigation/native";
import { useParams } from "react-router-native";

const ExerciseDetailsScreen = ({ route }) => {
  const { exerciseId } = route.params;
  console.log(exerciseId);

  const options = {
    headers: {
      "X-RapidAPI-Key": "9074bf701emsh2b8696dac91ac18p161ae0jsn7153acb84d2d",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  const { data: exercise, isLoading } = useQuery(["exercise"], () =>
    fetch(
      `https://exercisedb.p.rapidapi.com/exercises/exercise/${exerciseId}`,
      options
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  console.log(exercise);

  // useEffect(() => {
  //   navigation.setParams({ routine });
  // }, [routine]);

  return (
    <SafeAreaView>
      <ExerciseCard exercise={exercise} />
    </SafeAreaView>
  );
};

export default ExerciseDetailsScreen;
