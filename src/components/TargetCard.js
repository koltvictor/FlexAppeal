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
      >
        {exercise.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
  },
});
