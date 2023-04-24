import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { db } from "../app/firebase";
import { useNavigation } from "@react-navigation/native";
import styles from "../config/styles/UpdateRoutineStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

function UpdateRoutineScreen({ route }) {
  const { routine } = route.params;
  const [routineId, setRoutineId] = useState(routine.id);
  const [routineData, setRoutineData] = useState(routine);
  const [routineName, setRoutineName] = useState(routine.name);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialReps, setInitialReps] = useState([]);
  const [initialTime, setInitialTime] = useState(
    routineData.exercises.length > 0 ? routineData.exercises[0].time : 0
  );
  const [time, setTime] = useState(0);

  let navigation = useNavigation();
  const isUpdatingRoutine = true;

  useEffect(() => {
    const unsubscribe = db
      .collection("savedroutines")
      .doc(routineId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setRoutineData(doc.data());
        }
      });
    return () => unsubscribe();
  }, [routineId]);

  useEffect(() => {
    // Get the initial reps and time values of the routine
    const reps = routineData.exercises.map((exercise) => exercise.reps);
    const time = routineData.exercises.map((exercise) => exercise.time);
    setInitialReps(reps);
    setInitialTime(time);
  }, [routineData]);

  const handleRepsChange = (exercise, index, value) => {
    const exercises = [...routineData.exercises];
    exercises[index] = { ...exercise, reps: value };
    setRoutineData({ ...routineData, exercises });
  };

  const handleTimeChange = (exerciseIndex, value) => {
    const exercises = [...routineData.exercises];
    exercises[exerciseIndex] = { ...exercises[exerciseIndex], time: value };
    setRoutineData({ ...routineData, exercises });
  };

  const handleDeleteExercise = (index) => {
    const exercises = [...routineData.exercises];
    exercises.splice(index, 1);
    setRoutineData({ ...routineData, exercises });
  };

  const handleAddExercise = () => {
    navigation.navigate("Exercises", {
      isUpdatingRoutine,
      routine: routineData,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const savedRoutineRef = db.collection("savedroutines").doc(routineId);
      const updatedRoutineObj = {
        ...routineData,
        name: routineData.name,
        exercises: routineData.exercises,
      };
      await savedRoutineRef.update(updatedRoutineObj);
    } catch (error) {
      console.log(error);
    }
    setIsModalVisible(false);
    navigation.navigate("Saved Routines");
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const renderTimePicker = (exerciseIndex) => {
    const exercise = routineData.exercises[exerciseIndex];
    const timeOptions = [];

    for (let i = 0; i < 1000; i += 5) {
      const value = i * 1000;
      const label = `${i} ${i === 1 ? "second" : "seconds"}`;

      timeOptions.push(<Picker.Item key={value} label={label} value={value} />);
    }

    return (
      <Picker
        selectedValue={exercise.time}
        onValueChange={(value) => handleTimeChange(exerciseIndex, value)}
        itemStyle={styles.pickerItem}
      >
        {timeOptions}
      </Picker>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.routineName}>{routine.name}</Text>
        <View>
          {routineData.exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseContainer}>
              <Text style={styles.label}>{exercise.name}</Text>

              <View style={styles.setsRepsContainer}>
                <View style={styles.repsContainer}>
                  <Text style={styles.label}>Reps</Text>
                  <View style={styles.repsInput}>
                    <Picker
                      selectedValue={exercise.reps}
                      onValueChange={(value) =>
                        handleRepsChange(exercise, index, value)
                      }
                      itemStyle={styles.pickerItem}
                    >
                      {[...Array(201).keys()].map((value) => (
                        <Picker.Item
                          key={value}
                          label={value.toString()}
                          value={value}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.label}>Time</Text>
                  <View style={styles.timeInput}>
                    {renderTimePicker(index)}
                  </View>
                </View>
              </View>

              <View style={styles.deleteButtonContainer}>
                <TouchableOpacity
                  onPress={() => handleDeleteExercise(index)}
                  style={styles.deleteButton}
                >
                  <MaterialIcons name="close" size={24} color="red" />
                  <Text>Remove Exercise</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.addExerciseButtonContainer}>
          <TouchableOpacity onPress={handleAddExercise}>
            <Text style={styles.addExerciseButtonText}>+ Add Exercise</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.modalInput}
              placeholder="Routine Name"
              value={routine.name}
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
                onPress={handleSaveChanges}
                disabled={!routine.name}
              >
                <Text style={styles.modalButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.saveButton}>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            disabled={routine.length === 0}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={32}
              color="#FFFFFF"
            />
            <Text style={{ color: "white" }}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default UpdateRoutineScreen;
