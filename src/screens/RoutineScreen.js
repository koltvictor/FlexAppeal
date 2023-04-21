import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../app/firebase";
import routineStore from "../stores/RoutineStore";
import RoutineItem from "../components/RoutineItem";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import styles from "../config/styles/RoutineScreenStyles";

const RoutineScreen = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [routineName, setRoutineName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let navigation = useNavigation();

  useEffect(() => {
    // Subscribe to changes in the routine array in the routineStore
    const unsubscribe = routineStore.subscribeToRoutineChanges();
    return unsubscribe;
  }, []);

  const handleSaveRoutine = async () => {
    if (!routineName || /^\s*$/.test(routineName)) {
      setErrorMessage("Please give your routine a name");
      return;
    }
    const invalidInput = /[^a-zA-Z0-9]/.test(routineName);
    if (invalidInput) {
      setErrorMessage("Please only use letters and numbers!");
      return;
    }
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

  const onCancel = () => {
    setIsModalVisible(false);
    setRoutineName("");
    setErrorMessage("");
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
          <View style={styles.errorContainer}>
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
          </View>
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
              onPress={() => onCancel()}
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

export default RoutineScreen;
