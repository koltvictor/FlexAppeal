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
      <Text style={styles.header}>My Saved Routines:</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Helvetica",
  },
  routineContainer: {
    backgroundColor: "#2f2f2f",
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  routineName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Helvetica",
  },
});

export default SavedRoutinesScreen;
