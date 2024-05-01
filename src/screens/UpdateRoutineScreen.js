import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Modal, ScrollView } from "react-native";
import { db } from "../app/firebase";
import { useNavigation } from "@react-navigation/native";
import styles from "../config/styles/UpdateRoutineStyles";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import commonStyles from "../config/styles/CommonStyles";

function UpdateRoutineScreen({ route }) {
  const { routine } = route.params;
  const routineId = routine.id;
  const [routineCycles, setRoutineCycles] = useState(routine.numberOfCycles);
  const [routineData, setRoutineData] = useState(routine);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleRepsChange = (exercise, index, value) => {
    const exercises = [...routineData.exercises];
    exercises[index] = { ...exercise, reps: value || null };
    setRoutineData({ ...routineData, exercises });
  };

  const handleTimeChange = (exerciseIndex, value) => {
    const exercises = [...routineData.exercises];
    exercises[exerciseIndex] = {
      ...exercises[exerciseIndex],
      time: value || null,
    };
    setRoutineData({ ...routineData, exercises });
  };

  const handleRestTimeChange = (exerciseIndex, value) => {
    const exercises = [...routineData.exercises];
    exercises[exerciseIndex] = {
      ...exercises[exerciseIndex],
      rest: value || null,
    };
    setRoutineData({ ...routineData, exercises });
  };

  const handleRoutineCyclesChange = (value) => {
    setRoutineCycles(value);
    if (routineData.numberOfCycles !== value) {
      setRoutineData({ ...routineData, numberOfCycles: value });
    }
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

  const renderRestTimePicker = (exerciseIndex) => {
    const exercise = routineData.exercises[exerciseIndex];
    const timeOptions = [];

    for (let i = 0; i < 1000; i += 5) {
      const value = i * 1000;
      const label = `${i} ${i === 1 ? "second" : "seconds"}`;

      timeOptions.push(<Picker.Item key={value} label={label} value={value} />);
    }

    return (
      <Picker
        selectedValue={exercise.rest}
        onValueChange={(value) => handleRestTimeChange(exerciseIndex, value)}
        itemStyle={styles.pickerItem}
      >
        {timeOptions}
      </Picker>
    );
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.routineName}>{routine.name}</Text>
        <View style={styles.cyclesContainer}>
          <Text style={styles.routineName}>Cycles:</Text>
          <Picker
            selectedValue={routineCycles}
            onValueChange={handleRoutineCyclesChange}
            style={styles.cyclesInput}
            itemStyle={styles.pickerItemStyle}
          >
            {Array.from(Array(20).keys())
              .filter((num) => num > 0)
              .map((num) => (
                <Picker.Item key={num} label={num.toString()} value={num} />
              ))}
          </Picker>
        </View>
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
              <View style={styles.restTimeContainer}>
                <Text style={styles.label}>Rest Time</Text>
                <View style={styles.timeInput}>
                  {renderRestTimePicker(index)}
                </View>
              </View>

              <View style={styles.deleteButtonContainer}>
                <Ionicons
                  name="close-circle-outline"
                  size={24}
                  color="red"
                  onPress={() => handleDeleteExercise(index)}
                  style={styles.deleteButton}
                />
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
            <Text style={styles.routineName}>{routine.name}</Text>
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
