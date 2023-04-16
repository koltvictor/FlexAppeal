import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { auth, db } from "../../firebase";

export default function SavedRoutinesComponent() {
  console.log(auth.currentUser.uid);
  const [savedRoutines, setSavedRoutines] = useState([]);
  //   const fetchSavedRoutines = async () => {
  //     try {
  //       const user = auth.currentUser;
  //       const uid = user.uid;
  //       const savedRoutinesRef = db
  //         .collection("savedroutines")
  //         .where("userId", "==", uid);
  //       const snapshot = await savedRoutinesRef.get();
  //       const savedRoutines = [];
  //       snapshot.forEach((doc) => {
  //         savedRoutines.push({ id: doc.id, ...doc.data() });
  //       });
  //       console.log("Saved routines fetched successfully:", savedRoutines);
  //       setSavedRoutines(savedRoutines);
  //     } catch (error) {
  //       console.error("Error fetching saved routines:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchSavedRoutines();
  //   }, []);
  return (
    <View>
      {/* {savedRoutines.map((savedRoutine) => ( */}
      <Text>hi</Text>
      {/* ))} */}
    </View>
  );
}
