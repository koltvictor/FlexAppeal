import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "../config/styles/TargetCardStyles";

export default function TargetCard({ exercise }) {
  let navigation = useNavigation();
  return (
    <View style={styles.card} key={exercise.id}>
      <Text
        key={exercise.id}
        onPress={() => navigation.navigate("ExerciseDetails", { exercise })}
        style={styles.cardText}
      >
        {exercise.name}
      </Text>
    </View>
  );
}
