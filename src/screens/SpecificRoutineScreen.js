import { View, Text } from "react-native";
import React from "react";
import SpecificRoutineItem from "../components/SpecificRoutineItem";
import commonStyles from "../config/styles/CommonStyles";
import { ScrollView } from "react-native-gesture-handler";
import { useKeepAwake } from "expo-keep-awake";

export default function SpecificRoutineScreen({ route }) {
  const { routine } = route.params;
  useKeepAwake();
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
