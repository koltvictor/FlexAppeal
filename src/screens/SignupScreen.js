import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  auth,
  db,
} from "/Users/kolt/Development/FlexAppeal/DoneWithIt/firebase/index.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupScreen({ isSignedIn, setIsSignedIn }) {
  const navigate = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addUser = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((r) => {
        console.log(r);
        setIsSignedIn(true);
        navigate.navigate("Login");
      })
      .catch((error) => {
        console.log("your error:", error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="username"
          value={username}
          onChangeText={(username) => setUsername(username)}
          asterik
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          asterik
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          asterik
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={addUser} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("/")} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  input: {
    // fontSize: 36,
    width: "100%",
    backgroundColor: "lightgrey",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "lightblue",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "700",
  },
});
