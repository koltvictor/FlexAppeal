import React, { useContext } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import UserContext from "../app/contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import userStore from "../stores/UserStore";
import styles from "../config/styles/ProfileStyles";
import colors from "../config/colors";
import {
  useFetchUserProfile,
  useFetchSavedRoutines,
} from "../app/hooks/useProfileHooks.js";

const ProfileScreen = observer(({ navigation }) => {
  const { user } = useContext(UserContext);
  const { profile } = userStore;
  const { handleLogOut } = useContext(UserContext);
  const numSharedRoutines = userStore.numSharedRoutines;
  const numSavedRoutines = userStore.numSavedRoutines;

  if (user) {
    useFetchUserProfile(user.uid);
    useFetchSavedRoutines(user.uid);
  }

  const handleLogout = () => {
    handleLogOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Ionicons
          name={profile ? profile.icon : "camera"}
          size={100}
          color={colors.sandy}
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
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
});

export default ProfileScreen;
