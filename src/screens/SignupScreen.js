import { auth, createUserWithEmailAndPassword, db } from "../app/firebase";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignupScreen = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

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
        setDisplayName(displayName);

        // Create a user profile document in Firestore
        db.collection("users")
          .doc(user.uid)
          .set({
            displayName: displayName,
            email: email,
          })
          .then(() => {
            console.log("User profile document created successfully");

            // Create a user document in Firestore for the profile
            db.collection("profiles")
              .doc(user.uid)
              .set({
                username: displayName,
                email: email,
                icon: "", // This field will be updated later
              })
              .then(() => {
                console.log("User document created successfully");

                // Create an empty savedroutines collection in Firestore
                db.collection("savedroutines")
                  .doc(user.uid)
                  .set({
                    name: "",
                    numberOfCycles: 0,
                    exercises: [],
                  })
                  .then(() => {
                    console.log(
                      "SavedRoutines collection created successfully"
                    );

                    // Navigate to the Login screen
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
      <Text style={styles.title}>Sign up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setDisplayName(text)}
        value={displayName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#3498db",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default SignupScreen;
