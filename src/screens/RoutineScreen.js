import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../app/firebase";
import routineStore from "../app/RoutineStore";
import RoutineItem from "../components/RoutineItem";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";

const RoutineScreen = observer(() => {
  const { routine, setRoutine, subscribeToRoutineChanges } = routineStore;
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
            <View key={exercise.id} style={styles.exerciseContainer}>
              <RoutineItem style={styles.exerciseName} exercise={exercise} />
            </View>
          ))
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Routine Name"
          value={routineName}
          onChangeText={(text) => setRoutineName(text)}
          placeholderTextColor="gray"
        />
        <TouchableOpacity
          onPress={handleSaveRoutine}
          disabled={routineStore.routine.length === 0}
        >
          <Ionicons name="checkmark-circle-outline" size={32} color="#2980b9" />
        </TouchableOpacity>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  contentContainer: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    color: "gray",
  },
  exerciseContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2980b9",
  },
  inputContainer: {
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
});

export default RoutineScreen;
