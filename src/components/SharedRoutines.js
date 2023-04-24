import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../config/styles/SharedRoutinesStyles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

export default function SharedRoutines({ sharedRoutines }) {
  return (
    <View>
      <Text style={styles.listHeader}>Shared Routines</Text>
      <FlatList
        data={sharedRoutines}
        renderItem={({ item }) => (
          <View style={styles.routineContainer}>
            <Text style={styles.routineName}>{item.name}</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Specific Routine", { routine: item })
                }
              >
                <Ionicons
                  name="eye"
                  size={24}
                  color={colors.brightblue}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
