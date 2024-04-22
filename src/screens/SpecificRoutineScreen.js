import { View, Text } from "react-native";
import React from "react";
import SpecificRoutineItem from "../components/SpecificRoutineItem";
import styles from "../config/styles/SpecificRoutineStyles";
import commonStyles from "../config/styles/CommonStyles";
import { ScrollView } from "react-native-gesture-handler";

export default function SpecificRoutineScreen({ route, fromSavedRoutine }) {
  const { routine } = route.params;

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.centerCenter}>
        <Text style={commonStyles.titleText}>{routine.name}</Text>
        <Text style={commonStyles.headerText}>
          Cycles: {routine.numberOfCycles}
        </Text>
        <ScrollView>
          {routine.exercises.map((exercise) => (
            <SpecificRoutineItem key={exercise.id} exercise={exercise} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
