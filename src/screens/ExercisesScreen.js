import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { DataContext } from "../app/contexts/DataContext";
import styles from "../config/styles/ExercisesScreenStyles";
import targets from "../assets/targets";

export default function ExercisesScreen({ route }) {
  // imported data
  const { exercises } = useContext(DataContext);
  let navigation = useNavigation();

  const [isUpdatingRoutine, setIsUpdatingRoutine] = useState(null);

  useEffect(() => {
    setIsUpdatingRoutine(route.params?.isUpdatingRoutine ?? null);
  }, [route.params]);

  // searching logic
  const [searchQuery, setSearchQuery] = useState("");

  // filtering data
  const filteredExercises = exercises
    ? exercises.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exercise.bodyPart.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exercise.equipment
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          exercise.target.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView vertical={true} style={styles.listContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ExerciseIndexScreen")}
            style={styles.targetItem}
          >
            <Feather name="list" size={24} color="lightblue" />
            <Text style={styles.targetText}>View All Exercises</Text>
          </TouchableOpacity>
          {targets.map((target) => (
            <TouchableOpacity
              key={target}
              onPress={() =>
                navigation.navigate("TargetsScreen", {
                  target: target.toLowerCase(),
                  isUpdatingRoutine: isUpdatingRoutine,
                  routine: route.params?.routine ?? null,
                  targets: filteredExercises.filter(
                    (exercise) => exercise.target === target.toLowerCase()
                  ),
                })
              }
              style={styles.targetItem}
            >
              {/* <Feather name="target" size={24} color="grey" /> */}
              <Text style={styles.targetText}>{target}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
