import React from "react";
import { useNavigation, useParams } from "react-router-native";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Search from "../components/Search";
import BottomNav from "../components/BottomNav";
import ExerciseCard from "../components/ExerciseCard";
import { useQuery } from "react-query";

export default function ExercisesScreen({
  search,
  setSearch,
  clicked,
  setClicked,
  // exercises,
}) {
  const {
    data: exercises,
    isLoading,
    isError,
  } = useQuery("exercises", async () => {
    const response = await fetch(
      "https://exercisedb.p.rapidapi.com/exercises",
      {
        headers: {
          "X-RapidAPI-Key":
            "9074bf701emsh2b8696dac91ac18p161ae0jsn7153acb84d2d",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch exercises");
    }
    return response.json();
  });

  // const filteredExercises = exercises
  //   ?.filter(
  //     (exercise) =>
  //       exercise.name.toLowerCase().includes(search.toLowerCase()) ||
  //       exercise.bodyPart.toLowerCase().includes(search.toLowerCase()) ||
  //       exercise.equipment.toLowerCase().includes(search.toLowerCase()) ||
  //       exercise.target.toLowerCase().includes(search.toLowerCase())
  //   )
  //   ?.sort((a, b) => a.id - b.id);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Search
          search={search}
          setSearch={setSearch}
          clicked={clicked}
          setClicked={setClicked}
        />
        <ScrollView
          vertical="true"
          //   contentInsetAdjustmentBehavior="scrollableAxes"
          style={styles.listContainer}
        >
          {/* {filteredExercises
            // .sort((a, b) => a.id - b.id)
            .map((exercise, id) => (
              <Text
                style={styles.listItem}
                key={exercise.id}
                // onPress={() => navigation(`/exercise/${exercise.id}`)}
              >
                {exercise.name}
              </Text>
            ))} */}
        </ScrollView>
      </View>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
