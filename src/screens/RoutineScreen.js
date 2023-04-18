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
        />
        <TouchableOpacity
          onPress={handleSaveRoutine}
          disabled={routineStore.routine.length === 0}
        >
          <Ionicons name="checkmark-circle-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "white",
    fontSize: 16,
  },
  exerciseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#555555",
  },
  exerciseName: {
    color: "white",
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#555555",
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 18,
    marginRight: 16,
  },
});

export default RoutineScreen;
