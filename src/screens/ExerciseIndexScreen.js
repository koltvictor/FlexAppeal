import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useContext, useState } from "react";
import { DataContext } from "../app/contexts/DataContext";
import { useNavigation } from "@react-navigation/native";
import styles from "../config/styles/ExerciseIndexStyles";

export default function ExerciseIndexScreen() {
  const { exercises } = useContext(DataContext);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExercises = exercises
    ? exercises.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exercise.bodyPart.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exercise.equipment
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          exercise.target.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const renderExercise = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.exerciseContainer}
        onPress={() =>
          navigation.navigate("ExerciseDetails", { exercise: item })
        }
      >
        <Text style={styles.exerciseName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search exercises"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={filteredExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        style={styles.exerciseList}
        contentContainerStyle={styles.exerciseListContent}
      />
    </SafeAreaView>
  );
}
