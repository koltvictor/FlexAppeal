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

const RoutineScreen = ({ exercise }) => {
  const [repCount, setRepCount] = useState(0);
  const [timeInSeconds, setTimeInSeconds] = useState(0);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {exercise.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No exercises added to routine</Text>
          </View>
        ) : (
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
                  {Array.from({ length: 61 }, (_, i) => i * 5).map((value) => (
                    <Picker.Item
                      key={value}
                      label={value.toString()}
                      value={value}
                    />
                  ))}
                </Picker>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#fff",
  },
  exerciseContainer: {
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#141414",
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  exerciseTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  inputLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "#fff",
    fontWeight: "500",
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginLeft: "auto",
  },
  picker: {
    width: 100,
    height: 30,
    fontSize: 16,
    color: "#fff",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#ff2d55",
    borderRadius: 50,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
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
