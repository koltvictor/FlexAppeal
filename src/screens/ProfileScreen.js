import React, { useContext } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import UserContext from "../app/contexts/UserContext";
import Feather from "react-native-vector-icons/Feather";
import { observer } from "mobx-react-lite";
import userStore from "../stores/UserStore";
import styles from "../config/styles/ProfileStyles";
import colors from "../config/colors";
import {
  useFetchUserProfile,
  useFetchSavedRoutines,
} from "../app/hooks/useProfileHooks.js";
import favoritesStore from "../stores/FavoritesStore.js";

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
    favoritesStore.favorites.favexercises = [];
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
          color={colors.sandy}
          style={styles.avatar}
        />
        <Text style={styles.username}>{profile?.username}</Text>
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
