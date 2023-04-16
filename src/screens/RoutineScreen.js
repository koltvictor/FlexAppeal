import React from "react";
import { Button, StyleSheet, ScrollView, View, Text } from "react-native";
import { auth, db } from "../../firebase";
import routineStore from "../app/RoutineStore";
import RoutineItem from "../components/RoutineItem";

const RoutineScreen = ({ route }) => {
  const { routine } = routineStore;
  console.log(routine);
  console.log(auth.currentUser.uid);
  console.log(db);

  const handleSaveRoutine = async () => {
    try {
      const user = auth.currentUser;
      const uid = user.uid;
      console.log(uid);
      const savedRoutineRef = db.collection("savedroutines").doc(uid);
      const routineData = { exercises: [...routine], userId: uid };
      await savedRoutineRef.set(routineData);
      console.log("Routine saved successfully:", routineData);
    } catch (error) {
      console.error("Error saving routine:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {routine.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No exercises added to routine</Text>
          </View>
        ) : (
          routine.map((exercise) => (
            <RoutineItem key={exercise.id} exercise={exercise} />
          ))
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Save Routine"
          onPress={handleSaveRoutine}
          disabled={routine.length === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
  buttonContainer: {
    padding: 20,
  },
});

export default RoutineScreen;

// const handleSaveRoutine = async () => {
//   try {
//     const uid = auth.currentUser.uid;
//     const routinesRef = db.collection("routines");
//     const routineDoc = routinesRef.doc(uid);
//     const exerciseColl = routineDoc.collection("exercises");

//     await routineDoc.set({ routine });

//     for (const exercise of routine) {
//       await exerciseColl.add(exercise);
//     }

//     console.log("Routine saved successfully!");
//   } catch (error) {
//     console.error(error);
//   }
// };

// const handleSaveRoutine = () => {
//   const user = auth.currentUser;
//   const uid = user.uid;
//   console.log(uid);
//   const savedRoutineRef = db
//     .collection("savedroutines")
//     .doc(uid.toString());
//   savedRoutineRef
//     .set({ exercises: [...routine], userId: uid })
//     .then(() => console.log("Routine saved successfully"))
//     .catch((error) => console.error("Error saving routine:", error));
// };
