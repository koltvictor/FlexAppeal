import React from "react";
import { Button, StyleSheet, ScrollView, View, Text } from "react-native";
import { auth, firestore } from "../../firebase";
import routineStore from "../app/RoutineStore";
import RoutineItem from "../components/RoutineItem";

const RoutineScreen = ({ route }) => {
  const { routine } = routineStore;

  const handleSaveRoutine = async () => {
    try {
      const uid = auth.currentUser.uid;
      const routinesRef = firestore.collection("routines");
      const routineDoc = routinesRef.doc(uid);
      const exerciseColl = routineDoc.collection("exercises");

      await routineDoc.set({ routine });

      for (const exercise of routine) {
        await exerciseColl.add(exercise);
      }

      console.log("Routine saved successfully!");
    } catch (error) {
      console.error(error);
    }
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
            <RoutineItem key={exercise.id} exercise={exercise} />
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
