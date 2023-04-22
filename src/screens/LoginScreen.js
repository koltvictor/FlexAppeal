import { auth } from "../app/firebase/index.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../config/styles/LoginStyles.js";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard } from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  let navigation = useNavigation();
  const [passwordShown, setPasswordShown] = useState(false);

  const handleLogin = async () => {
    try {
      console.log("Logging in with email and password:", email, password);
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user.uid);
      setLoading(false);
      navigation.navigate("Dashboard");
    } catch (error) {
      console.warn("Error logging in:", error);
      setLoading(false);
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.topSection}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subTitle}>Welcome back!</Text>
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Ionicons
                name="mail-outline"
                size={24}
                color="#FFFFFF"
                style={styles.inputIcon}
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
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color="#FFFFFF"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordShown}
            />
            <TouchableOpacity
              style={styles.inputIcon}
              onPress={togglePasswordVisibility}
            >
              <Ionicons
                name={passwordShown ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>Don't have an account? Sign up here</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LoginScreen;
