import React, { useContext, useEffect, useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import UserContext from "../app/contexts/UserContext";
import Feather from "react-native-vector-icons/Feather";
import { observer } from "mobx-react-lite";
import userStore from "../stores/UserStore";
import { auth, db } from "../app/firebase";
import styles from "../config/styles/ProfileStyles";
import colors from "../config/colors";

const ProfileScreen = observer(({ navigation }) => {
  const { user } = useContext(UserContext);
  const { profile } = userStore;
  const { handleLogOut } = useContext(UserContext);
  const numSharedRoutines = userStore.numSharedRoutines;
  const numSavedRoutines = userStore.numSavedRoutines;

  useEffect(() => {
    const fetchProfile = async () => {
      const profileRef = db.collection("profiles").doc(user.uid);
      const doc = await profileRef.get();
      if (doc.exists) {
        userStore.setProfile(doc.data());
      } else {
        console.log("No profile data available");
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchSavedRoutines = async () => {
      const savedRoutinesRef = db.collection("savedroutines");
      const query = savedRoutinesRef.where("userId", "==", user.uid);
      const querySnapshot = await query.get();
      const savedRoutines = {};
      querySnapshot.forEach((doc) => {
        const routineName = doc.id.split("_")[1];
        savedRoutines[routineName] = doc.data();
      });
      userStore.setSavedRoutines(savedRoutines);
    };

    fetchSavedRoutines();
  }, [userStore.savedRoutines]); // add userStore.savedRoutines as a dependency

  const handleLogoutAndNavigate = async () => {
    await handleLogOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Feather
          name={profile ? profile.icon : "smile"}
          size={100}
          color={colors.softblue}
          style={styles.avatar}
        />
        <Text style={styles.username}>{profile?.username}</Text>
        <Text style={styles.email}>{profile ? profile.email : ""}</Text>
        <View style={styles.routineContainer}>
          <Text style={styles.routines}>
            saved routines: {numSavedRoutines}
          </Text>
          <Text style={styles.routines}>
            shared routines: {numSharedRoutines}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Update Profile", {
            profile: profile,
          });
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogoutAndNavigate}
        style={styles.logoutButton}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
});

export default ProfileScreen;
