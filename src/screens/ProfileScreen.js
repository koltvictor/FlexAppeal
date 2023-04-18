import { Button } from "@rneui/base";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, SafeAreaView } from "react-native";
import { db, doc, auth, updateDoc, getDoc } from "../../firebase"; // add getDoc import
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ProfileScreen({ navigation }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null); // add profile state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const uid = auth.currentUser.uid;
        const profileDoc = doc(db, "profiles", uid);
        const profileSnapshot = await getDoc(profileDoc);
        if (profileSnapshot.exists()) {
          setProfile(profileSnapshot.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };

    if (auth.currentUser) {
      fetchProfile();
    }
  }, [auth.currentUser, db]);

  const handleUpdateUsername = async () => {
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      username: username,
    });
    console.log("username updated successfully");
  };

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Icon name="account-circle" size={100} style={styles.avatar} />
        <Text style={styles.username}>{profile ? profile.username : ""}</Text>
        <Text style={styles.email}>{currentUser ? currentUser.email : ""}</Text>
      </View>
      <Button
        onPress={() => {
          navigation.navigate("Update Profile");
        }}
        style={styles.button}
      >
        Update Profile
      </Button>
      <Button onPress={handleLogOut} style={styles.button}>
        Log Out
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  avatar: {
    color: "#fff",
  },
  email: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#00ADEF",
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    color: "#fff",
    fontSize: 24,
    marginTop: 10,
  },
});
