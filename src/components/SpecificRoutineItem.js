import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../config/styles/SpecificRoutineItemStyles";
import beep from "../assets/sounds/beep.wav";
import endBeep from "../assets/sounds/endBeep.wav";
import { Audio } from "expo-av";

export default function SpecificRoutineItem({ exercise, inModal = false }) {
  const [timer, setTimer] = useState(exercise.time || null);
  const [timeRemaining, setTimeRemaining] = useState(timer);
  const [isRunning, setIsRunning] = useState(false);
  const [resetVisible, setResetVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timerReachedZero, setTimerReachedZero] = useState(false);

  const toggleModal = () => setShowModal(!showModal);
  const navigation = useNavigation();

  const playSound = async (sound) => {
    try {
      const { sound: soundObject } = await Audio.Sound.createAsync(sound);
      await soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let intervalId;
    let startTime;
    if (isRunning && timeRemaining > 0) {
      startTime = Date.now();
      intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const timeRemaining = Math.max(timer - elapsedTime, 0);
        setTimeRemaining(timeRemaining);
        if (timeRemaining === 0) {
          setIsRunning(false);
          setTimerReachedZero(true);
          setResetVisible(true); // show reset button
          toggleModal();
        } else if (timeRemaining <= 1000) {
          // play the end beep sound when the timer reaches 0
          playSound(endBeep);
        } else if (timeRemaining <= 4000 && timeRemaining > 1000) {
          // play the beep sound when the timer reaches 3 seconds
          playSound(beep);
        }
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
    toggleModal();
    setIsRunning(true);
    setTimeRemaining(timer - 1000); // update the timeRemaining state to the initial value of the timer state
    setResetVisible(false);
    setTimerReachedZero(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(timer);
    setTimerReachedZero(false); // reset timerReachedZero state
    setResetVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.indivExerContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ExerciseDetails", {
              exercise,
              fromSavedRoutine: true,
            })
          }
        >
          <Text style={styles.exerciseName}>{exercise.name}</Text>
        </TouchableOpacity>
        <View style={styles.timerAndButtonContainer}>
          {exercise.time && exercise.time > 0 && (
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>
                {formatTime(timeRemaining !== null ? timeRemaining : timer)}
              </Text>
              {isRunning ? (
                <TouchableOpacity
                  style={styles.timerButton}
                  onPress={stopTimer}
                >
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
                  {resetVisible && inModal && !timerReachedZero && (
                    <TouchableOpacity
                      style={styles.resetButton}
                      onPress={resetTimer}
                    >
                      <MaterialIcons name="replay" size={24} color="white" />
                    </TouchableOpacity>
                  )}
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
      <Modal visible={showModal} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>

          <Image
            source={{ uri: exercise.gifUrl }}
            alt={"gif"}
            style={styles.gif}
          />
          <Text style={styles.modalText}>{exercise.name}</Text>
          <Text style={styles.modalGoalText}>Goal: {exercise.reps} reps</Text>
          <View style={styles.timerModalContainer}>
            <Text style={styles.timerModalText}>
              {formatTime(timeRemaining !== null ? timeRemaining : timer)}
            </Text>
          </View>
          {resetVisible && inModal && timerReachedZero && (
            <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
              <MaterialIcons name="replay" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
}
