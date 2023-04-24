import React, { useContext, useEffect } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import UserContext from "../app/contexts/UserContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { observer } from "mobx-react-lite";
import userStore from "../stores/UserStore";
import { db } from "../app/firebase";
import styles from "../config/styles/ProfileStyles";
import colors from "../config/colors";

const ProfileScreen = observer(({ navigation }) => {
  const { user } = useContext(UserContext);
  const { profile } = userStore;
  const { handleLogOut } = useContext(UserContext);

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
        <Icon
          name={profile ? profile.icon : "account-circle"}
          size={100}
          color={colors.softblue}
          style={styles.avatar}
        />
        <Text style={styles.username}>{profile?.username}</Text>
        <Text style={styles.email}>{profile ? profile.email : ""}</Text>
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
