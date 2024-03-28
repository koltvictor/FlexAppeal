import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../app/contexts/DataContext";
import { useNavigation } from "@react-navigation/native";
import styles from "../config/styles/ExerciseIndexStyles";

export default function ExerciseIndexScreen() {
  const { exercises } = useContext(DataContext);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedExercises, setDisplayedExercises] = useState([]); // Store display subset
  const [offset, setOffset] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const filteredSubset = exercises
      ? exercises.filter(
          (exercise) =>
            exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exercise.bodyPart
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            exercise.equipment
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            exercise.target.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];
    setDisplayedExercises(filteredSubset.slice(0, 20)); // Initially display first 20
    setOffset(0);
  }, [searchQuery, exercises]);

  const loadMore = () => {
    setIsLoadingMore(true);

    const filteredSubset = exercises
      ? exercises.filter(
          (exercise) =>
            exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exercise.bodyPart
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            exercise.equipment
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            exercise.target.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

    // Check if filteredSubset is not empty
    if (filteredSubset.length > 0) {
      setDisplayedExercises((prevExercises) => [
        ...prevExercises,
        ...filteredSubset.slice(offset + 20, offset + 40),
      ]);
    }

    setOffset(offset + 20);
    setIsLoadingMore(false);
  };

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
        data={displayedExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        style={styles.exerciseList}
        contentContainerStyle={styles.exerciseListContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoadingMore && <ActivityIndicator />}
      />
    </SafeAreaView>
  );
}
