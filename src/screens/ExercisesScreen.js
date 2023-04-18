import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Search from "../components/Search";
import { DataContext } from "../app/contexts/DataContext";

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

  // targets data
  const targets = [
    "abductors",
    "abs",
    "adductors",
    "biceps",
    "calves",
    "cardiovascular system",
    "delts",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "levator scapulae",
    "pectorals",
    "quads",
    "serratus anterior",
    "spine",
    "traps",
    "triceps",
    "upper back",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <Search search={searchQuery} onSearch={handleSearch} /> */}
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
              <Feather name="target" size={24} color="black" />
              <Text style={styles.targetText}>{target}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => navigation.navigate("ExerciseIndexScreen")}
            style={styles.targetItem}
          >
            <Feather name="list" size={24} color="black" />
            <Text style={styles.targetText}>All Exercises</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  listItem: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  targetItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  targetText: {
    fontSize: 18,
    marginLeft: 10,
  },
});
