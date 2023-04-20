import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useContext } from "react";
import TargetCard from "../components/TargetCard";
import { DataContext } from "../app/contexts/DataContext";
import styles from "../config/styles/TargetsScreenStyles";

export default function TargetsScreen({ route }) {
  const { exercises } = useContext(DataContext);

  const target = route.params.target.toLowerCase();

  // filtering data based on selected target
  const filteredExercises = exercises.filter(
    (exercise) => exercise.target.toLowerCase() === target
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>{target}</Text>
        <ScrollView vertical={true} style={styles.listContainer}>
          {filteredExercises.map((exercise) => {
            return <TargetCard exercise={exercise} key={exercise.id} />;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
