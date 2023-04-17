import { View, Text } from "react-native";
import React from "react";

export default function SpecificRoutineScreen({ route }) {
  const { routine } = route.params;
  console.log(routine);
  return (
    <View>
      <Text>{routine.name}</Text>
      {routine.exercises.map((exercise) => (
        <Text key={exercise.id}>{exercise.name}</Text>
      ))}
    </View>
  );
}
