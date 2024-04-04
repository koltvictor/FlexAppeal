import { View, Text } from "react-native";
import React from "react";
import FavExercises from "../components/FavExercises";
import FavFriends from "../components/FavFriends";
import FavRoutines from "../components/FavRoutines";

export default function FavoritesScreen() {
  return (
    <View>
      <Text>FavoritesScreen</Text>
      <FavExercises />
      <FavFriends />
      <FavRoutines />
    </View>
  );
}
