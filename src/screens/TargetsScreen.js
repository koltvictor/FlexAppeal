import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useContext } from "react";
import TargetCard from "../components/TargetCard";
import { DataContext } from "../app/contexts/DataContext";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    backgroundColor: "#000",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 32,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingBottom: 16,
    color: "#FFF",
  },
});
