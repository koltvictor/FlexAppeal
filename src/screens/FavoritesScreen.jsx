import { View } from "react-native";
import React from "react";
import FavExercises from "../components/FavExercises";
import styles from "../config/styles/FavoritesScreenStyles";

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <FavExercises />
    </View>
  );
}
