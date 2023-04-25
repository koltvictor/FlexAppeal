import { useState, useEffect } from "react";
import { db, auth } from "../app/firebase";
import {
  Text,
  TextInput,
  FlatList,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import styles from "../config/styles/SavedRoutinesStyles";
import SavedRoutinesItem from "../components/SavedRoutinesItem";

function SavedRoutinesScreen({ navigation }) {
  const [savedRoutines, setSavedRoutines] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteSuccessModalVisible, setDeleteSuccessModalVisible] =
    useState(false);
  const [routineToDelete, setRoutineToDelete] = useState(null);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [shareError, setShareError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const [sharedRoutines, setSharedRoutines] = useState([]);

  // fetching savedroutines and sharedroutines from firebase
  useEffect(() => {
    const uid = auth.currentUser.uid;
    const userRef = db.collection("users").doc(uid);
    const unsubscribeUser = userRef.onSnapshot(
      (doc) => {
        const user = doc.data();
        setCurrentUser(user.username);
      },
      (error) => {
        console.error(error);
      }
    );
    const savedRoutinesRef = db
      .collection("savedroutines")
      .where("userId", "==", uid);

    const unsubscribeSavedRoutines = savedRoutinesRef.onSnapshot(
      (snapshot) => {
        const routines = [];
        snapshot.forEach((doc) => {
          const routine = {
            id: doc.id,
            ...doc.data(),
          };
          routines.push(routine);
        });
        setSavedRoutines(routines);
      },
      (error) => {
        console.error(error);
      }
    );
    return () => {
      unsubscribeSavedRoutines();
      unsubscribeUser();
    };
  }, []);

  useEffect(() => {
    const uid = auth.currentUser.uid;

    // Query for routines that have been shared with the current user
    const savedRoutinesRef = db
      .collection("savedroutines")
      .where("sharedWith", "array-contains", uid);

    const unsubscribeSavedRoutines = savedRoutinesRef.onSnapshot(
      (snapshot) => {
        const routines = [];
        snapshot.forEach((doc) => {
          const routine = {
            id: doc.id,
            ...doc.data(),
          };
          routines.push(routine);
        });
        setSharedRoutines(routines);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsubscribeSavedRoutines();
    };
  }, []);

  const combinedRoutines = [
    ...savedRoutines.map((item) => ({ ...item, type: "saved" })),
    ...sharedRoutines.map((item) => ({ ...item, type: "shared" })),
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.listHeader}>My Saved Routines</Text>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          data={combinedRoutines}
          renderItem={({ item }) => {
            let routineView;
            if (item.type === "saved") {
              routineView = (
                <SavedRoutinesItem
                  item={item}
                  navigation={navigation}
                  currentUser={currentUser}
                />
              );
            } else if (item.type === "shared") {
              routineView = (
                <View style={styles.routineContainer}>
                  <Text style={styles.listHeader}>Shared Routine</Text>
                  <Text style={styles.sharedByText}>
                    Shared by: {item.sharedBy}
                  </Text>
                  <Text style={styles.routineName}>{item.name}</Text>

                  <View style={styles.sharedIcon}>
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
                        style={styles.sharedIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
            return routineView;
          }}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>

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
                // onPress={handleDelete}
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
