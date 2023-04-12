import React, { useState } from "react";
import { useNavigate } from "react-router-native";
import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../firebase/index.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ setIsSignedIn }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const SignInUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsSignedIn(true);
        const user = userCredential.user;
        setCurrentUser(user);
        console.log(user.email);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="email address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigate("/")}>
          <Text style={styles.buttonText}>back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={SignInUser}>
          <Text style={styles.buttonText}>login</Text>
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
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 40,
    margin: 12,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    padding: 10,
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
