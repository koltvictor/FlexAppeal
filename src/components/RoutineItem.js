import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const RoutineItem = ({ exercise }) => {
  const [repCount, setRepCount] = useState(0);
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const navigation = useNavigation();

  const handleNavigateToExerciseCard = () => {
    navigation.navigate("ExerciseDetails", { exercise });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {exercise.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No exercises added to routine</Text>
          </View>
        ) : (
          <View key={exercise.id} style={styles.exerciseContainer}>
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={handleNavigateToExerciseCard}
            >
              <MaterialIcons name="arrow-forward" size={30} color="#fff" />
            </TouchableOpacity>
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
                  minimumTrackTintColor="#fff"
                  maximumTrackTintColor="#333"
                  thumbTintColor="#fff"
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
                  minimumTrackTintColor="#fff"
                  maximumTrackTintColor="#333"
                  thumbTintColor="#fff"
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
