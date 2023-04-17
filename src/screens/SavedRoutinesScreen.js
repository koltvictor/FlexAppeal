import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { Text, FlatList, View, Button } from "react-native";

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
    <View>
      <Text>My Saved Routines:</Text>
      <FlatList
        data={savedRoutines}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
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

export default SavedRoutinesScreen;
