import React from "react";
import { useNavigate, useParams } from "react-router-native";
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Search from "../components/Search";
import BottomNav from "../components/BottomNav";
import ExerciseCard from "../components/ExerciseCard";

export default function ExercisesScreen({
  filteredExercises,
  search,
  setSearch,
  clicked,
  setClicked,
}) {
  const navigate = useNavigate();
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
          {filteredExercises
            .sort((a, b) => a.id - b.id)
            .map((exercise, id) => (
              <Text
                key={exercise.id}
                onPress={() => navigate(`/exercise/${exercise.id}`)}
              >
                {exercise.name}
              </Text>
            ))}
        </ScrollView>
      </View>
      <View>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: window.height,
    width: window.width,
    marginBottom: 100,
    paddingVertical: 20,
    marginLeft: 20,
  },
  listContainer: {
    // flex: 1,
    marginBottom: 83,
  },
});
