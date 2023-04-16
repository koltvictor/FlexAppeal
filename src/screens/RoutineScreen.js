import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
} from "react-native";
import { auth, db } from "../../firebase";
import routineStore from "../app/RoutineStore";
import RoutineItem from "../components/RoutineItem";
import { useNavigation } from "@react-navigation/native";

const RoutineScreen = () => {
  const { routine, subscribeToRoutineChanges } = routineStore;
  const [routineName, setRoutineName] = useState("");
  let navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = subscribeToRoutineChanges();
    return unsubscribe;
  }, [routine]);

  const handleSaveRoutine = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        // If the user is not authenticated, display an error message and return
        console.error("Error saving routine: User is not authenticated");
        alert("Please sign in to save routines");
        return;
      }
      const uid = user.uid;
      const routineId = `${uid}_${routineName}`;
      const savedRoutineRef = db.collection("savedroutines").doc(routineId);

      // Check if routine name already exists
      const routineNameExists = await db
        .collection("savedroutines")
        .where("userId", "==", uid)
        .where("name", "==", routineName)
        .get()
        .then((snapshot) => !snapshot.empty);

      if (routineNameExists) {
        // If routine name already exists, send an error message
        console.error("Error saving routine: Routine name already exists");
        alert(
          "This name already exists, please choose a different name to save the routine under"
        );
        return;
      }

      const routineData = {
        exercises: [...routine],
        userId: uid,
        name: routineName,
      };
      await savedRoutineRef.set(routineData, { merge: true });
      console.log("Routine saved successfully:", routineData);

      // Clear routine stateful variable after successful save
      routineStore.clearRoutine();
      setRoutineName("");
    } catch (error) {
      console.error("Error saving routine:", error);
    }
    navigation.navigate("Saved Routines");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {routineStore.routine.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No exercises added to routine</Text>
          </View>
        ) : (
          routineStore.routine.map((exercise) => (
            <RoutineItem key={exercise.id} exercise={exercise} />
          ))
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Routine Name"
          value={routineName}
          onChangeText={(text) => setRoutineName(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Save Routine"
          onPress={handleSaveRoutine}
          disabled={routine.length === 0}
        />
        <Button
          title="Clear Routine"
          onPress={() => routineStore.clearRoutine()}
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
