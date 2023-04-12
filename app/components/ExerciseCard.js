import { Button } from "@rneui/base";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ExerciseCard({ exercise, idNum }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>{exercise.name}</Text>
      <Text style={styles.info}>target muscle: {exercise.target}</Text>
      <Text style={styles.info}>equipment: {exercise.equipment}</Text>
      <Image
        source={{ uri: exercise.gifUrl }}
        alt={"gif"}
        style={{ width: "100%", height: "75%", resizeMode: "contain" }}
      />
      <Button title="Add to routine" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  info: {
    fontSize: 15,
    textAlign: "center",
  },
});
