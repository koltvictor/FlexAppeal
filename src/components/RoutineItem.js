import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import routineStore from "../app/RoutineStore";

const RoutineScreen = ({ route }) => {
  const { routine } = routineStore;
  const [repCount, setRepCount] = useState(0);
  const [timeInSeconds, setTimeInSeconds] = useState(0);

  const handleSaveRoutine = () => {
    // Save the routine to the appropriate user document in Firestore
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {routine.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No exercises added to routine</Text>
          </View>
        ) : (
          routine.map((exercise) => (
            <View key={exercise.id} style={styles.exerciseContainer}>
              <Text style={styles.exerciseTitle}>{exercise.name}</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Reps</Text>
                <TouchableOpacity style={styles.pickerContainer}>
                  <Picker
                    selectedValue={repCount}
                    onValueChange={(value) => setRepCount(value)}
                    style={styles.picker}
                  >
                    {Array.from({ length: 101 }, (_, i) => i).map((value) => (
                      <Picker.Item
                        key={value}
                        label={value.toString()}
                        value={value}
                      />
                    ))}
                  </Picker>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Time (seconds)</Text>
                <TouchableOpacity style={styles.pickerContainer}>
                  <Picker
                    selectedValue={timeInSeconds}
                    onValueChange={(value) => setTimeInSeconds(value)}
                    style={styles.picker}
                  >
                    {Array.from({ length: 61 }, (_, i) => i * 5).map(
                      (value) => (
                        <Picker.Item
                          key={value}
                          label={value.toString()}
                          value={value}
                        />
                      )
                    )}
                  </Picker>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, routine.length === 0 && styles.disabledButton]}
          onPress={handleSaveRoutine}
          disabled={routine.length === 0}
        >
          <Text style={styles.buttonText}>Save Routine</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
  exerciseContainer: {
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  exerciseTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  inputLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "#333",
    fontWeight: "500",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginLeft: "auto",
  },
  picker: {
    width: 100,
    height: 30,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#007aff",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default RoutineScreen;
