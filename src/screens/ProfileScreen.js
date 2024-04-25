import React, { useContext, useEffect } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import UserContext from "../app/contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import userStore from "../stores/UserStore";
import styles from "../config/styles/ProfileStyles";
import commonStyles from "../config/styles/CommonStyles.js";
import colors from "../config/colors";
import { useFetchSavedRoutines } from "../app/hooks/useProfileHooks.js";

const ProfileScreen = observer(({ navigation }) => {
  const { user, profile, handleLogOut } = useContext(UserContext);
  const numSharedRoutines = userStore.numSharedRoutines;
  const numSavedRoutines = userStore.numSavedRoutines;

  useFetchSavedRoutines(user?.uid);

  useEffect(() => {
    if (!user) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  }, [user, navigation]);

  const handleLogout = () => {
    handleLogOut();

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.centerCenter}>
        <View style={styles.avatarContainer}>
          <Ionicons
            name={profile ? profile.icon : "camera"}
            size={100}
            color={colors.sandy}
            style={styles.avatar}
          />
          <Text style={commonStyles.titleText}>{profile?.username}</Text>
          <Text style={commonStyles.subheaderText}>
            {profile ? profile.email : ""}
          </Text>
          <View style={styles.routineContainer}>
            <Text style={commonStyles.text}>
              saved routines: {numSavedRoutines}
            </Text>
            <Text style={commonStyles.text}>
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
          style={commonStyles.secondaryButton}
        >
          <Text style={commonStyles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={commonStyles.primaryButton}
        >
          <Text style={commonStyles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

export default ProfileScreen;
