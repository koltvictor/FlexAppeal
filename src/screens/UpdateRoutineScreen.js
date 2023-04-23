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
  const [updatedRoutine, setUpdatedRoutine] = useState(routine);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialReps, setInitialReps] = useState([]);
  const [initialTime, setInitialTime] = useState(
    updatedRoutine.exercises.length > 0 ? updatedRoutine.exercises[0].time : 0
  );
  const [time, setTime] = useState(0);

  let navigation = useNavigation();
  const isUpdatingRoutine = true;

  useEffect(() => {
    // Get the initial reps and time values of the routine
    const reps = updatedRoutine.exercises.map((exercise) => exercise.reps);
    const time = updatedRoutine.exercises.map((exercise) => exercise.time);
    setInitialReps(reps);
    setInitialTime(time);
  }, []);

  const handleRepsChange = (exercise, index, value) => {
    const exercises = [...updatedRoutine.exercises];
    exercises[index] = { ...exercise, reps: value };
    setUpdatedRoutine({ ...updatedRoutine, exercises });
  };

  const handleTimeChange = (exerciseIndex, value) => {
    const exercises = [...updatedRoutine.exercises];
    exercises[exerciseIndex] = { ...exercises[exerciseIndex], time: value };
    setUpdatedRoutine({ ...updatedRoutine, exercises });
  };

  const handleDeleteExercise = (index) => {
    const exercises = [...updatedRoutine.exercises];
    exercises.splice(index, 1);
    setUpdatedRoutine({ ...updatedRoutine, exercises });
  };

  const handleAddExercise = () => {
    navigation.navigate("Exercises", { isUpdatingRoutine });
  };

  const handleSaveChanges = async () => {
    try {
      const savedRoutineRef = db.collection("savedroutines").doc(routine.id);
      const updatedRoutineObj = {
        ...routine,
        name: updatedRoutine.name,
        exercises: updatedRoutine.exercises,
      };
      await savedRoutineRef.update(updatedRoutineObj);
    } catch (error) {
      console.error("Error updating routine: ", error);
    }
    setIsModalVisible(false);
    navigation.navigate("Saved Routines");
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const renderTimePicker = (exerciseIndex) => {
    const exercise = updatedRoutine.exercises[exerciseIndex];
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
      <ScrollView contentContainerStyle={styles.contenContainer}>
        <Text style={styles.routineName}>{routine.name}</Text>
        <View style={styles.exerciseContainer}>
          {updatedRoutine.exercises.map((exercise, index) => (
            <View key={index}>
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
              <TouchableOpacity
                onPress={() => handleDeleteExercise(index)}
                style={styles.deleteButton}
              >
                <MaterialIcons name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={handleAddExercise}>
            <Text>+ Add Exercise</Text>
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
