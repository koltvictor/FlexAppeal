import { useState, useEffect } from "react";
import { db, auth } from "../app/firebase";
import {
  Text,
  TextInput,
  FlatList,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import styles from "../config/styles/SavedRoutinesStyles";
import Toast from "react-native-toast-message";
import commonStyles from "../config/styles/CommonStyles";

function SavedRoutinesScreen({ navigation, route }) {
  const [savedRoutines, setSavedRoutines] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [routineToDelete, setRoutineToDelete] = useState(null);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [shareInput, setShareInput] = useState("");
  const [shareError, setShareError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [userIdToUsername, setUserIdToUsername] = useState({});
  const [unshareModalVisible, setUnshareModalVisible] = useState(false);
  const [routineToUnshare, setRoutineToUnshare] = useState(null);
  const [checkedUsers, setCheckedUsers] = useState({});
  const [sharedRoutines, setSharedRoutines] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
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
  }, [auth.currentUser]);

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
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    // Query for routines that have been shared with the current user
    const savedRoutinesRef = db
      .collection("savedroutines")
      .where("sharedWith", "array-contains", uid);

    const unsubscribeSavedRoutines = savedRoutinesRef.onSnapshot(
      (snapshot) => {
        const routines = [] || null;
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
    setShareInput("");
    setShareError("");
  };

  const handleShareSubmit = async () => {
    try {
      if (shareInput.includes("@")) {
        const snapshot = await db
          .collection("users")
          .where("email", "==", shareInput.toLowerCase())
          .get();
        if (snapshot.empty) {
          setShareError("User not found");
        } else {
          let sharedUserId = null;
          snapshot.forEach((doc) => {
            if (doc.data().email === shareInput.toLowerCase()) {
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
      } else {
        const snapshot = await db
          .collection("users")
          .where("username", "==", shareInput)
          .get();
        if (snapshot.empty) {
          setShareError("User not found");
        } else {
          let sharedUserId = null;
          snapshot.forEach((doc) => {
            if (doc.data().username === shareInput) {
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
      }
    } catch (error) {
      console.error(error);
      setShareError("Error sharing routine");
    }
  };

  const handleUnshare = (routine) => {
    setRoutineToUnshare(routine);
    setCheckedUsers(
      routine.sharedWith.reduce(
        (acc, userId) => ({ ...acc, [userId]: false }),
        {}
      )
    );
    setUnshareModalVisible(true);
  };

  const handleUnshareSubmit = async () => {
    console.log("this is checkedUsers:", checkedUsers);
    const usersToUnshare = Object.entries(checkedUsers)
      .filter(([, isChecked]) => isChecked)
      .map(([userId]) => userId);

    console.log("this is usersToUnshare:", usersToUnshare);
    console.log("routineToUnshare.id:", routineToUnshare.id);

    if (!routineToUnshare.id) {
      console.error("Error: routineToUnshare.id is invalid");
      return;
    }

    try {
      const sharedWithRef = db
        .collection("savedroutines")
        .doc(routineToUnshare.id);

      const newSharedWith = routineToUnshare.sharedWith.filter(
        (userId) => !usersToUnshare.includes(userId)
      );

      await sharedWithRef.update({
        sharedWith: newSharedWith,
      });

      // Reset state
      setUnshareModalVisible(false);
      setRoutineToUnshare(null);
      setCheckedUsers({});
    } catch (error) {
      console.error("Error unsharing routine:", error);
    }
  };

  //  delete routine
  const handleDelete = () => {
    db.collection("savedroutines").doc(routineToDelete.id).delete();
    setDeleteModalVisible(false);
    Toast.show({
      type: "success",
      text1: "Routine deleted",
      visibilityTime: 2000,
      topOffset: 100,
    });
  };

  return (
    <View style={commonStyles.container}>
      <View style={styles.centerCenter}>
        <TouchableOpacity
          style={commonStyles.secondaryButton}
          onPress={() =>
            navigation.navigate("Shared Routines", {
              sharedRoutines: sharedRoutines,
            })
          }
        >
          <Text style={commonStyles.buttonText}>Shared Routines</Text>
        </TouchableOpacity>
        <Text style={commonStyles.headerText}>My Saved Routines</Text>

        <FlatList
          data={savedRoutines}
          renderItem={({ item }) => {
            return (
              <View style={styles.routineContainer}>
                <Text style={commonStyles.subheaderText}>{item.name}</Text>
                <Text style={commonStyles.text}>
                  Cycles: {item.numberOfCycles}
                </Text>
                <Text style={commonStyles.text}>
                  Exercises: {item.exercises.length}
                </Text>
                <View style={styles.iconsContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Specific Routine", {
                        routine: item,
                        fromSavedRoutine:
                          route.params?.fromSavedRoutine ?? true,
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
                  {item.sharedWith && item.sharedWith.length > 0 ? (
                    <TouchableOpacity onPress={() => handleUnshare(item)}>
                      <Ionicons
                        name="remove-circle"
                        size={24}
                        color={colors.red}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                <Text style={styles.sharedWith}>
                  {item.sharedWith && item.sharedWith.length > 0
                    ? `Shared with: ${item.sharedWith
                        .map((userId) => userIdToUsername[userId])
                        .join(", ")}`
                    : ""}
                </Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={shareModalVisible}
                  >
                    <View style={styles.shareModalContainer}>
                      <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Share:</Text>
                        <TextInput
                          style={styles.modalInput}
                          value={shareInput}
                          onChangeText={setShareInput}
                          placeholder="username or email address"
                          placeholderTextColor="grey"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCorrect={false}
                        />
                        {shareError ? (
                          <Text style={styles.modalError}>{shareError}</Text>
                        ) : null}
                        <View style={styles.modalButtons}>
                          <TouchableOpacity
                            style={commonStyles.secondaryButton}
                            onPress={() => setShareModalVisible(false)}
                          >
                            <Text style={commonStyles.buttonText}>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={commonStyles.primaryButton}
                            onPress={() => handleShareSubmit(item)}
                          >
                            <Text style={commonStyles.buttonText}>Share</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                </TouchableWithoutFeedback>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={unshareModalVisible}
        >
          <View style={styles.shareModalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Unshare Routine:</Text>
              {routineToUnshare?.sharedWith?.map((userId) => (
                <View key={userId} style={styles.checkboxItem}>
                  <BouncyCheckbox
                    isChecked={checkedUsers[userId]}
                    fillColor={colors.red}
                    onPress={() =>
                      setCheckedUsers({
                        ...checkedUsers,
                        [userId]: !checkedUsers[userId],
                      })
                    }
                    style={styles.checkbox}
                  />
                  <Text style={styles.modalText}>
                    {userIdToUsername[userId]}
                  </Text>
                </View>
              ))}

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={commonStyles.secondaryButton}
                  onPress={() => setUnshareModalVisible(false)}
                >
                  <Text style={commonStyles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={commonStyles.primaryButton}
                  onPress={() => handleUnshareSubmit()}
                >
                  <Text style={commonStyles.buttonText}>Unshare</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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
      </View>
    </View>
  );
}
export default SavedRoutinesScreen;
