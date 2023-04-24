import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../config/styles/SharedRoutinesStyles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

export default function SharedRoutines({ sharedRoutines }) {
  return (
    <View>
      <Text style={styles.title}>Shared Routines</Text>
      <FlatList
        data={sharedRoutines}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
