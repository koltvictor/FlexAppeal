import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { DataContext } from "../app/contexts/DataContext";
import { useNavigation } from "@react-navigation/native";

export default function ExerciseIndexScreen() {
  const { exercises } = useContext(DataContext);
  let navigation = useNavigation();

  const renderExercise = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ExerciseDetails", { exercise: item })
        }
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={exercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
