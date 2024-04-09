import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TargetCard from "../components/TargetCard";
import { DataContext } from "../app/contexts/DataContext";
import styles from "../config/styles/TargetsScreenStyles";

export default function TargetsScreen({ route, fromSavedRoutine }) {
  const { exercises } = useContext(DataContext);

  const target = route.params.target.toLowerCase();

  const routine = route.params.routine;

  // filtering data based on selected target
  const filteredExercises = exercises.filter(
    (exercise) => exercise.target.toLowerCase() === target
  );

  const [isUpdatingRoutine, setIsUpdatingRoutine] = useState(null);

  useEffect(() => {
    setIsUpdatingRoutine(route.params?.isUpdatingRoutine ?? null);
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>{target}</Text>
        <ScrollView vertical={true} style={styles.listContainer}>
          {filteredExercises.map((exercise) => {
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
