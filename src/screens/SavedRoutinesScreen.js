import { useState, useEffect } from "react";
import { db, auth } from "../app/firebase";
import { Text, FlatList, View, Button, StyleSheet } from "react-native";

function SavedRoutinesScreen({ navigation }) {
  const [savedRoutines, setSavedRoutines] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser.uid;
    const savedRoutinesRef = db
      .collection("savedroutines")
      .where("userId", "==", uid);

    const unsubscribe = savedRoutinesRef.onSnapshot((snapshot) => {
      const routines = [];
      snapshot.forEach((doc) => {
        routines.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setSavedRoutines(routines);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Routines</Text>
      <FlatList
        data={savedRoutines}
        renderItem={({ item }) => (
          <View style={styles.routineContainer}>
            <Text style={styles.routineName}>{item.name}</Text>
            <Button
              title="View Routine"
              onPress={() =>
                navigation.navigate("Specific Routine", { routine: item })
              }
              color="#ffffff"
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  header: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
    fontFamily: "Helvetica",
  },
  routineContainer: {
    backgroundColor: "#333333",
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  routineName: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
    fontFamily: "Helvetica",
  },
});

export default SavedRoutinesScreen;
