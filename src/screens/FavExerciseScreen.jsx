import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, View, Text, ScrollView } from "react-native";
import { options } from "../app/contexts/DataContext";
import { useQuery } from "react-query";

export default function FavExerciseScreen({ route }) {
  const exerciseName = route.params.exercise;
  console.log(exerciseName);

  const [exerciseDetails, setExerciseDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: fetchedExercise } = useQuery(["exercise", exerciseName], () =>
    fetch(
      `https://exercisedb.p.rapidapi.com/exercises/name/${exerciseName}`,
      options
    ).then((res) => res.json())
  );

  useEffect(() => {
    if (fetchedExercise) {
      setExerciseDetails(fetchedExercise);
      setIsLoading(false);
    }
  }, [fetchedExercise]);

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoading && <Text>Loading exercise data...</Text>}

        {exerciseDetails && (
          <View>
            {exerciseDetails.map((exercise) => (
              <View key={exercise.id} style={{ marginBottom: 10 }}>
                <Text>{exercise.name}</Text>
                <Text>{exercise.instructions}</Text>
                <Image
                  src={exercise.gifUrl}
                  alt={exercise.gifUrl}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
