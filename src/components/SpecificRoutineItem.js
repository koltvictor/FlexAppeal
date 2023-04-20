import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../config/styles/SpecificRoutineItemStyles";

export default function SpecificRoutineItem({ exercise }) {
  const [timer, setTimer] = useState(exercise.time || null);
  const [timeRemaining, setTimeRemaining] = useState(timer);
  const [isRunning, setIsRunning] = useState(false);
  const [resetVisible, setResetVisible] = useState(false);
  const navigation = useNavigation();

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
    setResetVisible(true);
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
    setTimeRemaining(timer - 1000); // update the timeRemaining state to the initial value of the timer state
    setResetVisible(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(timer);
    setResetVisible(false);
  };

  const handleExerciseNamePress = () => {
    navigation.navigate("ExerciseDetails", { exercise });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleExerciseNamePress}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
      </TouchableOpacity>
      <View style={styles.timerAndButtonContainer}>
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
              <>
                <TouchableOpacity
                  style={styles.timerButton}
                  onPress={startTimer}
                >
                  <Text style={styles.timerButtonText}>Start</Text>
                </TouchableOpacity>
                {resetVisible && (
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={resetTimer}
                  >
                    <MaterialIcons name="replay" size={24} color="white" />
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        )}
      </View>
      {exercise.reps && exercise.reps > 0 && (
        <View style={styles.repsContainer}>
          <Text style={styles.repsText}>{exercise.reps} Reps</Text>
        </View>
      )}
    </View>
  );
}
