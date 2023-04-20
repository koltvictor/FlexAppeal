import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { observer } from "mobx-react-lite";
import routineStore from "../stores/RoutineStore";

const RoutineItem = observer(({ exercise, index }) => {
  const [name, setName] = useState(exercise.name);
  const [time, setTime] = useState(routineStore.time[index]);
  const [reps, setReps] = useState(routineStore.reps[index]);

  const removeExercise = () => {
    routineStore.removeExercise(index);
  };

  const handleRepsChange = (value) => {
    setReps(value);
    routineStore.handleRepsChange(index, value);
  };

  const handleTimeChange = (value) => {
    setTime(value);
    routineStore.handleTimeChange(index, value);
  };

  const renderTimePicker = () => {
    const timeOptions = [];

    for (let i = 0; i < 1000; i += 5) {
      const value = i * 1000;
      const label = `${i} ${i === 1 ? "second" : "seconds"}`;

      timeOptions.push(<Picker.Item key={value} label={label} value={value} />);
    }

    return (
      <Picker selectedValue={time} onValueChange={handleTimeChange}>
        {timeOptions}
      </Picker>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{name}</Text>
      <View style={styles.setsRepsContainer}>
        <View style={styles.repsContainer}>
          <Text style={styles.label}>Reps</Text>
          <View style={styles.repsInput}>
            <Picker
              selectedValue={reps}
              onValueChange={handleRepsChange}
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
          <View style={styles.timeInput}>{renderTimePicker()}</View>
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={removeExercise}>
          <MaterialIcons name="close" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  setsRepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  repsContainer: {
    flex: 1,
    marginRight: 10,
  },
  repsInput: {
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    backgroundColor: "#FFFFFF",
  },
  pickerItem: {
    fontSize: 16,
  },
  timeContainer: {
    flex: 1,
  },
  timeInput: {
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    backgroundColor: "#FFFFFF",
  },
});

export default RoutineItem;
