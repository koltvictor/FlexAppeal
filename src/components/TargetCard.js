import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

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

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1c1c1e",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#444",
    borderWidth: 1,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
