import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { observer } from "mobx-react-lite";
import routineStore from "../stores/RoutineStore";
import styles from "../config/styles/RoutineItemStyles";

const RoutineItem = observer(({ exercise, index }) => {
  const [name, setName] = useState(exercise.name);
  const [time, setTime] = useState(routineStore.time[index]);
  const [reps, setReps] = useState(routineStore.reps[index]);

  const removeExercise = () => {
    routineStore.removeExercise(index);
  };

  const handleRepsChange = (value) => {
    setReps(value);
    routineStore.handleRepsChange(index, value === null ? 0 : value);
  };

  const handleTimeChange = (value) => {
    setTime(value);
    routineStore.handleTimeChange(index, value === null ? 0 : value);
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

  return (
    <View style={styles.container}>
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
      <View style={styles.container}>
        <TouchableOpacity onPress={removeExercise}>
          <MaterialIcons name="close" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
});
export default RoutineItem;
