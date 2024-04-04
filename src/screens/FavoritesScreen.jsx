import { View } from "react-native";
import React from "react";
import FavExercises from "../components/FavExercises";
import FavFriends from "../components/FavFriends";
import FavRoutines from "../components/FavRoutines";

export default function FavoritesScreen() {
  return (
    <View>
      <FavExercises />
      <FavFriends />
      <FavRoutines />
    </View>
  );
}
