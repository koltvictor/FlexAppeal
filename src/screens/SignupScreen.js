import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, createUserWithEmailAndPassword, db } from "../app/firebase";
import { Ionicons } from "@expo/vector-icons";
import styles from "../config/styles/SignupStyles.js";
import colors from "../config/colors.js";
import userStore from "../stores/UserStore.js";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const navigation = useNavigation();

  const initialIcon = ["skull"];

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSignup = () => {
    if (email === "" || password === "" || confirmPassword === "") {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUsername(username);

        // Create a user profile document in Firestore
        db.collection("users")
          .doc(user.uid)
          .set({
            username: username,
            email: email.toLowerCase(),
            icon: initialIcon,
          })
          .then(() => {
            // Create a user document in Firestore for the profile
            db.collection("profiles")
              .doc(user.uid)
              .set({
                username: username,
                email: email.toLowerCase(),
                icon: initialIcon,
              })
              .then(() => {
                const profileData = {
                  username,
                  email: email.toLowerCase(),
                  icon: initialIcon,
                };
                userStore.setProfile(profileData);
                // Create an empty savedroutines collection in Firestore
                db.collection("savedroutines")
                  .doc(user.uid)
                  .set({
                    name: "",
                    numberOfCycles: 0,
                    exercises: [],
                  })
                  .then(() => {
                    db.collection("favorites").doc(user.uid).set({
                      favexercises: [],
                      favfriends: [],
                      favroutines: [],
                    });
                  })
                  .then(() => {
                    navigation.navigate("Welcome");
                  })
                  .catch((error) => {
                    console.error(
                      "Error creating SavedRoutines collection: ",
                      error
                    );
                  });
              })
              .catch((error) => {
                console.error("Error creating user document: ", error);
              });
          })
          .catch((error) => {
            console.error("Error creating user profile document: ", error);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("Error", "That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert("Error", "That email address is invalid!");
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.subTitle}>Create your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={24}
          color={colors.navy}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.slate}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={24}
          color={colors.navy}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.slate}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={24}
          color={colors.navy}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.slate}
          placeholder="Password"
          secureTextEntry={!passwordShown}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.inputIcon}
          onPress={togglePasswordVisibility}
        >
          <Ionicons
            name={passwordShown ? "eye-outline" : "eye-off-outline"}
            size={24}
            color={colors.brightblue}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={24}
          color={colors.navy}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.slate}
          placeholder="Confirm password"
          secureTextEntry={!passwordShown}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
