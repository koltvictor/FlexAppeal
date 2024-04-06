import { View } from "react-native";
import React from "react";
import FavExercises from "../components/FavExercises";
import FavFriends from "../components/FavFriends";
import FavRoutines from "../components/FavRoutines";
import styles from "../config/styles/FavoritesScreenStyles";

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <FavExercises />
      <FavFriends />
      <FavRoutines />
    </View>
  );
}
