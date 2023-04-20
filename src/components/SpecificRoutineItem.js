import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SpecificRoutineItem({ exercise }) {
  const [timer, setTimer] = useState(exercise.time || null);
  const [timeRemaining, setTimeRemaining] = useState(timer);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    let startTime;
    if (isRunning && timeRemaining > 0) {
      startTime = Date.now();
      intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const timeRemaining = Math.max(timer - elapsedTime, 0);
        setTimeRemaining(timeRemaining);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timer]);

  useEffect(() => {
    setTimeRemaining(timer || 0);
  }, [timer]);

  const stopTimer = () => {
    setIsRunning(false);
  };

  const formatTime = (milliseconds) => {
    if (isNaN(milliseconds) || milliseconds === null) return ""; // handle invalid input
    const seconds = Math.floor(milliseconds / 1000);
    const formattedSeconds = (seconds % 60).toString().padStart(2, "0");
    const formattedMinutes = Math.floor(seconds / 60).toString();
    if (formattedMinutes === "0") {
      return `:${formattedSeconds}`;
    } else {
      return `${formattedMinutes}:${formattedSeconds}`;
    }
  };

  const startTimer = () => {
    setIsRunning(true);
    setTimeRemaining(timer); // update the timeRemaining state to the initial value of the timer state
  };

  return (
    <View style={styles.container}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      {exercise.time && exercise.time > 0 && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {formatTime(timeRemaining !== null ? timeRemaining : timer)}
          </Text>
          {isRunning ? (
            <TouchableOpacity style={styles.timerButton} onPress={stopTimer}>
              <Text style={styles.timerButtonText}>Stop</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.timerButton} onPress={startTimer}>
              <Text style={styles.timerButtonText}>Start</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {exercise.reps && exercise.reps > 0 && (
        <View style={styles.repsContainer}>
          <Text style={styles.repsText}>{exercise.reps} Reps</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    marginRight: 8,
  },
  timerButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 8,
  },
  timerButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  repsContainer: {
    backgroundColor: "#ccc",
    borderRadius: 8,
    padding: 8,
  },
  repsText: {
    fontWeight: "bold",
  },
});
