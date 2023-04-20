import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../app/firebase";
import routineStore from "../stores/RoutineStore";
import RoutineItem from "../components/RoutineItem";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";

const RoutineScreen = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [routineName, setRoutineName] = useState("");
  const [reps, setReps] = useState([]);
  const [time, setTime] = useState([]);
  let navigation = useNavigation();

  useEffect(() => {
    // Subscribe to changes in the routine array in the routineStore
    const unsubscribe = routineStore.subscribeToRoutineChanges();
    return unsubscribe;
  }, []);

  const handleSaveRoutine = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("Error saving routine: User is not authenticated");
        alert("Please sign in to save routines");
        return;
      }
      const uid = user.uid;
      const routineId = `${uid}_${routineName}`;
      const savedRoutineRef = db.collection("savedroutines").doc(routineId);

      const routineData = {
        exercises: routineStore.routine.map((exercise) => {
          return {
            ...exercise,
            reps: exercise.reps || null,
            time: exercise.time || null,
          };
        }),
        userId: uid,
        name: routineName,
      };
      await savedRoutineRef.set(routineData, { merge: true });
      console.log("Routine saved successfully:", routineData);
      // Clear routine variable in routineStore
      routineStore.clearRoutine();
      setRoutineName("");
    } catch (error) {
      console.error("Error saving routine:", error);
    }
    setIsModalVisible(false);
    navigation.navigate("Saved Routines");
  };

  const handleRepsChange = (index, value) => {
    routineStore.handleRepsChange(index, value);
  };

  const handleTimeChange = (index, value) => {
    routineStore.handleTimeChange(index, value);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {routineStore.routine.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No exercises added to routine</Text>
          </View>
        ) : (
          routineStore.routine.map((exercise, index) => (
            <View key={exercise.id} style={styles.exerciseContainer}>
              <RoutineItem
                exercise={exercise}
                index={index}
                exerciseId={exercise.id}
                handleRepsChange={handleRepsChange}
                handleTimeChange={handleTimeChange}
              />
            </View>
          ))
        )}
      </ScrollView>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.modalInput}
            placeholder="Routine Name"
            value={routineName}
            onChangeText={(text) => setRoutineName(text)}
            placeholderTextColor="gray"
          />
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSaveRoutine}
              disabled={!routineName}
            >
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          disabled={routineStore.routine.length === 0}
        >
          <Ionicons name="checkmark-circle-outline" size={32} color="#2980b9" />
          <Text style={{ color: "white" }}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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
    backgroundColor: "grey",
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
    backgroundColor: "#000",
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
    color: "white",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    justifyContent: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "white",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#2980b9",
    marginRight: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default RoutineScreen;
