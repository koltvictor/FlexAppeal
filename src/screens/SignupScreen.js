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
import { auth, createUserWithEmailAndPassword, db } from "../app/firebase";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const initialIcon = ["account-circle"];

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
            email: email,
          })
          .then(() => {
            console.log("User profile document created successfully");

            // Create a user document in Firestore for the profile
            db.collection("profiles")
              .doc(user.uid)
              .set({
                username: username,
                email: email,
                icon: initialIcon,
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
      <Text style={styles.header}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#777777"
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#777777"
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#777777"
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#777777"
        placeholder="Confirm password"
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingTop: 100,
    alignItems: "center",
  },
  header: {
    color: "#00C6FF",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 40,
    fontFamily: "Helvetica Neue",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: "#00C6FF",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: "Helvetica Neue",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#00C6FF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Helvetica Neue",
  },
});

export default SignupScreen;
