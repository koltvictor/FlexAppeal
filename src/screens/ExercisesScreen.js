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
import Search from "../components/Search";
import { DataContext } from "../app/DataContext";

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
        <Search search={searchQuery} onSearch={handleSearch} />
        <ScrollView vertical={true} style={styles.listContainer}>
          {filteredExercises.map((exercise, id) => (
            <TouchableOpacity
              key={exercise.id}
              onPress={() =>
                navigation.navigate("ExerciseDetails", {
                  exerciseId: exercise.id,
                })
              }
            >
              <Text style={styles.listItem}>{exercise.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  searchInput: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  listItemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNavContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
