import { View } from "react-native";
import React from "react";
import FavExercises from "../components/FavExercises";
import styles from "../config/styles/FavoritesScreenStyles";
import commonStyles from "../config/styles/CommonStyles";

export default function FavoritesScreen() {
  return (
    <View style={commonStyles.container}>
      <FavExercises />
    </View>
  );
}
