import { useState, useEffect } from "react";
import { db, auth } from "../app/firebase";
import { Text, FlatList, View, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import styles from "../config/styles/SavedRoutinesStyles";

function SavedRoutinesScreen({ navigation }) {
  const [savedRoutines, setSavedRoutines] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteSuccessModalVisible, setDeleteSuccessModalVisible] =
    useState(false);
  const [routineToDelete, setRoutineToDelete] = useState(null);

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

  const handleDelete = () => {
    db.collection("savedroutines").doc(routineToDelete.id).delete();
    setDeleteModalVisible(false);
    setDeleteSuccessModalVisible(true);
    setTimeout(() => {
      setDeleteSuccessModalVisible(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={savedRoutines}
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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Update Routine", { routine: item })
                }
              >
                <Ionicons
                  name="pencil"
                  size={24}
                  color={colors.sandy}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                title="Delete Routine"
                onPress={() => {
                  setRoutineToDelete(item);
                  setDeleteModalVisible(true);
                }}
              >
                <Ionicons
                  name="trash"
                  size={24}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this routine?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonNo}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>NO</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleDelete}
              >
                <Text style={styles.modalButtonText}>YES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteSuccessModalVisible}
      >
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.modalText}>Routine Deleted!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default SavedRoutinesScreen;
