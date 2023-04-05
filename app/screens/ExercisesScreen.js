import React from "react";
import { useNavigate } from "react-router-native";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Search from "../components/Search";

export default function ExercisesScreen({
  filteredExercises,
  search,
  setSearch,
}) {
  const navigate = useNavigate();
  return (
    <SafeAreaView>
      <View>
        <Search search={search} setSearch={setSearch} />
        <Button
          title="back to dashboard"
          onPress={() => navigate("/dashboard")}
          style={styles.button}
        />
        <ScrollView vertical="true">
          {filteredExercises
            // .sort((a, b) => a.id - b.id)
            .map((exercise, id) => (
              <Text key={id}>{exercise.name}</Text>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: { position: "absolute", bottom: 0 },
});
