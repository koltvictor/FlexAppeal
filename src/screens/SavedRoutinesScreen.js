import { useState, useEffect } from "react";
import { db, auth } from "../app/firebase";
import {
  Text,
  TextInput,
  FlatList,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import styles from "../config/styles/SavedRoutinesStyles";

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
  const [userIdToUsername, setUserIdToUsername] = useState({});

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

  // map user ids to usernames for shared routines

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

  const handleShare = (routine) => {
    setRoutineToDelete(routine);
    setShareModalVisible(true);
    setShareEmail("");
    setShareError("");
  };

  const handleShareSubmit = async () => {
    try {
      const snapshot = await db
        .collection("users")
        .where("email", "==", shareEmail.toLowerCase())
        .get();
      if (snapshot.empty) {
        setShareError("User not found");
      } else {
        let sharedUserId = null;
        snapshot.forEach((doc) => {
          if (doc.data().email === shareEmail.toLowerCase()) {
            sharedUserId = doc.id;
          }
        });
        if (!sharedUserId) {
          setShareError("User not found");
        } else {
          const sharedWith = routineToDelete.sharedWith || [];
          if (!sharedWith.includes(sharedUserId)) {
            sharedWith.push(sharedUserId);
            await db
              .collection("savedroutines")
              .doc(routineToDelete.id)
              .update({ sharedWith, sharedBy: currentUser });
          }
          setShareModalVisible(false);
        }
      }
    } catch (error) {
      console.error(error);
      setShareError("Error sharing routine");
    }
  };

  //  delete routine
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
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Shared Routines", {
            sharedRoutines: sharedRoutines,
          })
        }
      >
        <Text style={styles.buttonText}>View Shared Routines → </Text>
      </TouchableOpacity>
      <Text style={styles.listHeader}>My Saved Routines</Text>

      <FlatList
        data={savedRoutines}
        renderItem={({ item }) => {
          return (
            <View style={styles.routineContainer}>
              <Text style={styles.routineName}>{item.name}</Text>
              <Text style={styles.cycles}>Cycles: {item.numberOfCycles}</Text>
              <View style={styles.iconsContainer}>
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
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Update Routine", {
                      routine: item,
                    })
                  }
                >
                  <Ionicons
                    name="pencil"
                    size={24}
                    color={colors.sandy}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleShare(item)}>
                  <Ionicons
                    name="share"
                    size={24}
                    color={colors.lightgrey}
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
              <Text style={styles.sharedWith}>
                {item.sharedWith && item.sharedWith.length > 0
                  ? `Shared with: ${item.sharedWith
                      .map((userId) => userIdToUsername[userId])
                      .join(", ")}`
                  : ""}
              </Text>
              <Modal
                animationType="slide"
                transparent={true}
                visible={shareModalVisible}
              >
                <View style={styles.shareModalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalText}>
                      Enter the email address of the user with whom you would
                      like to share this routine:
                    </Text>
                    <TextInput
                      style={styles.modalInput}
                      value={shareEmail}
                      onChangeText={setShareEmail}
                      placeholder="Email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    {shareError ? (
                      <Text style={styles.modalError}>{shareError}</Text>
                    ) : null}
                    <View style={styles.modalButtons}>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => setShareModalVisible(false)}
                      >
                        <Text style={styles.modalButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => handleShareSubmit(item)}
                      >
                        <Text style={styles.modalButtonText}>Share</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          );
        }}
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
