import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import Toast from "react-native-toast-message";
import routineStore from "../stores/RoutineStore";
import styles from "../config/styles/RoutineItemStyles";

const RoutineItem = observer(({ exercise, exerciseId, drag, isActive }) => {
  const name = exercise.name;
  const [time, setTime] = useState(routineStore.time[exerciseId] || null);
  const [reps, setReps] = useState(routineStore.reps[exerciseId] || null);
  const [rest, setRest] = useState(routineStore.rest[exerciseId] || null);

  const removeExercise = () => {
    routineStore.removeExercise(exerciseId);
    Toast.show({
      type: "info",
      position: "top",
      topOffset: 100,
      text1: `${exercise.name} removed`,
      text1Style: { fontSize: 12, color: "black", textAlign: "center" },
      visibilityTime: 2000,
      autoHide: true,
      swipeable: true,
    });
  };

  const handleRepsChange = action((value) => {
    setReps(value);
    routineStore.handleRepsChange(exerciseId, value === null ? 0 : value);
  });

  const handleTimeChange = (value) => {
    setTime(value);
    routineStore.handleTimeChange(exerciseId, value === null ? 0 : value);
  };

  const handleRestTimeChange = (value) => {
    setRest(value);
    routineStore.handleRestTimeChange(exerciseId, value === null ? 0 : value);
  };

  const renderRepsPicker = () => {
    const repsOptions = [<Picker.Item key={-1} label="--" value={null} />];

    for (let i = 0; i < 201; i++) {
      repsOptions.push(<Picker.Item key={i} label={i.toString()} value={i} />);
    }

    return (
      <Picker
        selectedValue={reps}
        onValueChange={handleRepsChange}
        style={styles.pickerItem}
        itemStyle={styles.pickerItemStyle}
      >
        {repsOptions}
      </Picker>
    );
  };

  const renderTimePicker = () => {
    const timeOptions = [<Picker.Item key={-1} label="--" value={null} />];

    for (let i = 0; i < 1000; i += 5) {
      const value = i * 1000;
      const label = `${i} ${i === 1 ? "second" : "seconds"}`;

      timeOptions.push(<Picker.Item key={value} label={label} value={value} />);
    }

    return (
      <Picker
        selectedValue={time}
        onValueChange={handleTimeChange}
        style={styles.pickerItem}
        itemStyle={styles.pickerItemStyle}
      >
        {timeOptions}
      </Picker>
    );
  };

  const renderRestTimePicker = () => {
    const restOptions = [<Picker.Item key={-1} label="--" value={null} />];

    for (let i = 0; i < 1000; i += 5) {
      const value = i * 1000;
      const label = `${i} ${i === 1 ? "second" : "seconds"}`;

      restOptions.push(<Picker.Item key={value} label={label} value={value} />);
    }

    return (
      <Picker
        selectedValue={rest}
        onValueChange={handleRestTimeChange}
        style={styles.pickerItem}
        itemStyle={styles.pickerItemStyle}
      >
        {restOptions}
      </Picker>
    );
  };

  return (
    <View style={isActive ? styles.active : styles.container}>
      <TouchableOpacity onLongPress={drag}>
        <Text style={styles.label}>{name}</Text>
        <View style={styles.setsRepsContainer}>
          <View style={styles.repsContainer}>
            <Text style={styles.label}>Reps</Text>
            <View style={styles.repsInput}>{renderRepsPicker()}</View>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.label}>Time</Text>
            <View style={styles.timeInput}>{renderTimePicker()}</View>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.label}>Rest</Text>
          <View style={styles.timeInput}>{renderRestTimePicker()}</View>
        </View>
        <Ionicons
          name="close-circle"
          size={24}
          color="red"
          onPress={removeExercise}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
    </View>
  );
});
export default RoutineItem;
