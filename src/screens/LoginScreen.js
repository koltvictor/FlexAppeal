import { auth } from "../../firebase/index.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let navigation = useNavigation();
  const [passwordShown, setPasswordShown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  const handleLogin = async () => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsSignedIn(true);
        const user = userCredential.user;
        setCurrentUser(user);
        console.log(currentUser);
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subTitle}>Welcome back!</Text>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <Image
            // source={require("./assets/email.png")}
            style={styles.inputIconImage}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <Image
            // source={require("./assets/password.png")}
            style={styles.inputIconImage}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText} onPress={handleLogin}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  topSection: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    color: "#7C7C7C",
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
    marginLeft: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputIconImage: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: "#1ED760",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    color: "#1ED760",
    fontSize: 16,
    marginTop: 30,
  },
  error: {
    color: "#FF0000",
    fontSize: 16,
    marginTop: 30,
  },
});

export default LoginScreen;
