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
  const [newFilteredExercises, setNewFilteredExercises] = useState(exercises);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [availableEquipmentTypes, setAvailableEquipmentTypes] = useState([]);

  const target = route.params.target.toLowerCase();

  const routine = route.params.routine;

  const filteredExercises = exercises.filter(
    (exercise) => exercise.target.toLowerCase() === target
  );

  useEffect(() => {
    const calculateEquipmentTypes = () => {
      const allEquipment = filteredExercises.map((ex) => ex.equipment);
      const uniqueEquipment = [...new Set(allEquipment)];
      setAvailableEquipmentTypes(uniqueEquipment);
    };

    calculateEquipmentTypes();
  }, [target]);

  const applyFilters = (newFilters) => {
    setSelectedFilters(newFilters);
    if (newFilters.length > 0) {
      const newlyFilteredExercises = exercises.filter((exercise) => {
        return (
          exercise.target.toLowerCase() === target &&
          newFilters.includes(exercise.equipment)
        );
      });
      setNewFilteredExercises(newlyFilteredExercises);
    } else {
      setNewFilteredExercises(filteredExercises);
    }
  };

  const [isUpdatingRoutine, setIsUpdatingRoutine] = useState(null);

  useEffect(() => {
    setIsUpdatingRoutine(route.params?.isUpdatingRoutine ?? null);
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setIsFilterModalVisible(true)}
            style={styles.filterContainer}
          >
            <Text style={styles.filterButton}>Filters</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.header}>{target}</Text>

        <FilterModal
          visible={isFilterModalVisible}
          onClose={() => setIsFilterModalVisible(false)}
          onApplyFilters={applyFilters}
          target={target}
          exercises={exercises}
          availableEquipmentTypes={availableEquipmentTypes}
        />
        <ScrollView vertical={true} style={styles.listContainer}>
          {selectedFilters.length > 0
            ? newFilteredExercises.map((exercise) => {
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
              })
            : filteredExercises.map((exercise) => {
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
