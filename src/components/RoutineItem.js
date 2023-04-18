import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import Ionicons from "react-native-vector-icons/Ionicons";

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
              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  value={repCount}
                  onValueChange={(value) => setRepCount(value)}
                />
                <Text style={styles.sliderValue}>{repCount}</Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Time (seconds)</Text>
              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={300}
                  step={5}
                  value={timeInSeconds}
                  onValueChange={(value) => setTimeInSeconds(value)}
                />
                <Text style={styles.sliderValue}>{timeInSeconds}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#000",
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
    color: "#fff",
    fontSize: 16,
  },
  exerciseContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  exerciseTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputLabel: {
    color: "#fff",
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
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#000",
  },
};

export default RoutineScreen;
