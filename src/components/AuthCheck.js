import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import { auth } from "../app/firebase/index.js";

const AuthCheck = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const storedCredentials = await SecureStore.getItemAsync(
        "userCredentials"
      );

      if (storedCredentials) {
        try {
          const { email, password } = JSON.parse(storedCredentials);
          await auth().signInWithEmailAndPassword(email, password);
          setIsLoggedIn(true);
        } catch (error) {
          console.error(error);
          // Optionally: clear credentials on re-authentication failure
          await SecureStore.deleteItemAsync("userCredentials");
        }
      }
      console.log("isLoggedIn after re-auth attempt:", isLoggedIn);
      setAuthLoading(false);
    };

    checkLogin();
  }, []);

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isLoggedIn
    ? navigation.navigate("Dashboard")
    : navigation.navigate("Login");
};

export default AuthCheck;
