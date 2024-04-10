import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TargetCard from "../components/TargetCard";
import { DataContext } from "../app/contexts/DataContext";
import styles from "../config/styles/TargetsScreenStyles";
import FilterModal from "../components/Filter";

export default function TargetsScreen({ route, fromSavedRoutine }) {
  const { exercises } = useContext(DataContext);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [newFilteredExercises, setNewFilteredExercises] = useState(exercises); // Assume you have allExercises

  const target = route.params.target.toLowerCase();

  const routine = route.params.routine;

  const filteredExercises = exercises.filter(
    (exercise) => exercise.target.toLowerCase() === target
  );

  const applyFilters = (selectedFilters) => {
    const newlyFilteredExercises = filteredExercises.filter((exercise) => {
      return selectedFilters.includes(exercise.equipment); // Adjust based on your exercise data
    });
    setNewFilteredExercises(newlyFilteredExercises);
    setIsFilterModalVisible(false);
  };

  const [isUpdatingRoutine, setIsUpdatingRoutine] = useState(null);

  useEffect(() => {
    setIsUpdatingRoutine(route.params?.isUpdatingRoutine ?? null);
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>{target}</Text>
        <TouchableOpacity onPress={() => setIsFilterModalVisible(true)}>
          <Text style={styles.filterButton}>Filters</Text>
        </TouchableOpacity>
        <FilterModal
          visible={isFilterModalVisible}
          onClose={() => setIsFilterModalVisible(false)}
          onApplyFilters={applyFilters}
        />
        <ScrollView vertical={true} style={styles.listContainer}>
          {newFilteredExercises.map((exercise) => {
            return (
              <View key={exercise.id} style={styles.targetWrapper}>
                <TargetCard
                  exercise={exercise}
                  key={exercise.id}
                  isUpdatingRoutine={isUpdatingRoutine}
                  routine={routine}
                  fromSavedRoutine={fromSavedRoutine}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
