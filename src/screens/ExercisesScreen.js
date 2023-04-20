import React, { useContext, useState } from "react";
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

export default function ExercisesScreen() {
  // imported data
  const { exercises } = useContext(DataContext);
  let navigation = useNavigation();

  // searching logic
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

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
          {targets.map((target) => (
            <TouchableOpacity
              key={target}
              onPress={() =>
                navigation.navigate("TargetsScreen", {
                  target: target.toLowerCase(),
                  targets: filteredExercises.filter(
                    (exercise) => exercise.target === target.toLowerCase()
                  ),
                })
              }
              style={styles.targetItem}
            >
              <Feather name="target" size={24} color="white" />
              <Text style={styles.targetText}>{target}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => navigation.navigate("ExerciseIndexScreen")}
            style={styles.targetItem}
          >
            <Feather name="list" size={24} color="white" />
            <Text style={styles.targetText}>All Exercises</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
