import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import UserContext from "../app/contexts/UserContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { observer } from "mobx-react-lite";
import userStore from "../stores/UserStore";
import { db } from "../app/firebase";

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
          color="#00c9ff"
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
        style={[styles.button, { backgroundColor: "#00c9ff" }]}
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogoutAndNavigate}
        style={[styles.button, { backgroundColor: "#ff2d55" }]}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  username: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  email: {
    fontSize: 20,
    color: "#00c9ff",
    marginBottom: 30,
  },
  button: {
    borderRadius: 30,
    marginVertical: 10,
    marginHorizontal: 40,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileScreen;
