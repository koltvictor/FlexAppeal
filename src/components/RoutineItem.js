import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Picker from "react-native-picker-select";
import Slider from "@react-native-community/slider";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { makeObservable, observable } from "mobx-react-lite";
import routineStore from "../stores/RoutineStore";

const RoutineItem = observer(({ exercise, index }) => {
  const [name, setName] = useState(exercise.name);
  const [sets, setSets] = useState(exercise.sets);

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleSetsChange = (value) => {
    setSets(value);
  };

  const handleRepsChange = (value) => {
    routineStore.handleRepsChange(index, value);
  };

  const handleTimeChange = (value) => {
    routineStore.handleTimeChange(index, value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={handleNameChange}
      />
      <View style={styles.setsRepsContainer}>
        <TextInput
          style={[styles.input, styles.setsInput]}
          value={sets}
          onChangeText={handleSetsChange}
        />
        <Text style={styles.label}>sets</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={routineStore.reps[index]}
            onValueChange={handleRepsChange}
            style={styles.picker}
          >
            {[...Array(20).keys()].map((num) => (
              <Picker.Item
                key={num}
                label={`${num + 1}`}
                value={`${num + 1}`}
              />
            ))}
          </Picker>
        </View>
        <Text style={styles.label}>reps</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={routineStore.time[index]}
            onValueChange={handleTimeChange}
            style={styles.picker}
          >
            {[...Array(120).keys()].map((num) => (
              <Picker.Item
                key={num}
                label={`${num + 1}`}
                value={`${num + 1}`}
              />
            ))}
          </Picker>
        </View>
        <Text style={styles.label}>time</Text>
      </View>
    </View>
  );
});

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#000",
    fontSize: 16,
  },
  exerciseContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  exerciseTitle: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 5,
  },
  inputLabel: {
    color: "#000",
    fontSize: 18,
    marginRight: 10,
  },
  sliderContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  slider: {
    flex: 1,
  },
  sliderValue: {
    color: "#000",
    fontSize: 18,
    marginLeft: 10,
  },
  navigateButton: {
    backgroundColor: "#000",
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
};

export default RoutineItem;
