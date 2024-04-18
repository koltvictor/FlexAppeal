import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import colors from "../config/colors";
import styles from "../config/styles/SavedRoutinesStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { db } from "../app/firebase";

export default function SharedRoutinesScreen({ navigation }) {
  const route = useRoute();
  const [userIdToUsername, setUserIdToUsername] = useState({});

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      const users = {};
      snapshot.forEach((doc) => {
        const user = doc.data();
        users[doc.id] = user.username;
      });
      setUserIdToUsername(users);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.listHeader}>Shared Routines</Text>
      <FlatList
        data={route.params.sharedRoutines}
        renderItem={({ item }) => {
          return (
            <View style={styles.routineContainer}>
              <Text style={styles.routineName}>{item.name}</Text>
              <Text style={styles.cycles}>Cycles: {item.numberOfCycles}</Text>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Specific Routine", {
                      routine: item,
                    })
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
              <Text style={styles.sharedWith}>
                {item.sharedBy && item.sharedBy.length > 0
                  ? `Shared by: ${item.sharedBy}`
                  : ""}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
