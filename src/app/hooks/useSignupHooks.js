import { useState } from "react";
import { Alert } from "react-native";
import { auth, createUserWithEmailAndPassword, db } from "../firebase";
import userStore from "../../stores/UserStore";

export const useSignup = () => {
  const [username, setUsername] = useState("");

  const handleSignup = async (
    username,
    email,
    password,
    confirmPassword,
    initialIcon,
    navigation
  ) => {
    // ... (your existing validation logic) ...
    if (email === "" || password === "" || confirmPassword === "") {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      setUsername(username);

      await db.collection("users").doc(user.uid).set({
        username: username,
        email: email.toLowerCase(),
        icon: initialIcon,
      });

      await db.collection("profiles").doc(user.uid).set({
        username: username,
        email: email.toLowerCase(),
        icon: initialIcon,
      });

      const profileData = {
        username,
        email: email.toLowerCase(),
        icon: initialIcon,
      };
      userStore.setProfile(profileData);

      await db.collection("savedroutines").doc(user.uid).set({
        name: "",
        numberOfCycles: 0,
        exercises: [],
      });

      await db.collection("favorites").doc(user.uid).set({
        favexercises: [],
        favfriends: [],
        favroutines: [],
      });

      navigation.navigate("Welcome");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "That email address is already in use!");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "That email address is invalid!");
      } else {
        console.error(error);
      }
    }
  };

  return handleSignup;
};
