import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import routineStore from "../stores/RoutineStore";
import styles from "../config/styles/ExerciseCardStyles";

const ExerciseCard = ({ exercise, fromUpdateRoutineScreen }) => {
  const { routine, addExercise } = routineStore;
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleAddToRoutine = (exercise) => {
    if (fromUpdateRoutineScreen) {
      const exercises = [...routine.exercises, exercise];
      routineStore.setRoutine({ ...routine, exercises });
    } else {
      addExercise(exercise);
    }
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setShowModal(false);
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 500);
      });
    }
  }, [showModal]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{exercise.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.label}>Target Muscle</Text>
          <Text style={styles.value}>{exercise.target}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.label}>Equipment</Text>
          <Text style={styles.value}>{exercise.equipment}</Text>
        </View>
      </View>
      <Image
        source={{ uri: exercise.gifUrl }}
        alt={"gif"}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAddToRoutine(exercise)}
      >
        <Text style={styles.buttonText}>Add to routine</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      {showModal && (
        <Animated.View
          style={[styles.modal, { opacity: fadeAnim, top: 0, left: 0 }]}
        >
          <Text style={styles.modalText}>Added to routine!</Text>
        </Animated.View>
      )}
    </View>
  );
};
export default ExerciseCard;
