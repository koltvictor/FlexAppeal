import React from "react";
import { Button, StyleSheet, ScrollView, View, Text } from "react-native";
import routineStore from "../app/RoutineStore";

const RoutineScreen = ({ route }) => {
  const { routine } = routineStore;
  console.log(routine);

  const handleSaveRoutine = () => {
    // Save the routine to the appropriate user document in Firestore
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {routine.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No exercises added to routine</Text>
          </View>
        ) : (
          routine.map((exercise) => (
            <Text key={exercise.id}>{exercise.name}</Text>
          ))
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Save Routine"
          onPress={handleSaveRoutine}
          disabled={routine.length === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
  buttonContainer: {
    padding: 20,
  },
});

export default RoutineScreen;
