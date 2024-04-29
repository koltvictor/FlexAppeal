import { auth } from "../firebase/index.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  let navigation = useNavigation();

  const firebaseErrorMessages = {
    "auth/user-not-found": "User not found",
    "auth/wrong-password": "Incorrect password",
    "auth/invalid-email": "Invalid email",
    "auth/too-many-requests": "Too many requests, try again later",
  };

  const handleLogin = async (email, password, rememberMe) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      if (rememberMe) {
        await SecureStore.setItemAsync(
          "userCredentials",
          JSON.stringify({ email, password })
        );
        console.log(
          "Stored Credentials:",
          await SecureStore.getItemAsync("userCredentials")
        );
      } else {
        await SecureStore.deleteItemAsync("userCredentials");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.code, error.message);
      const customMessage = firebaseErrorMessages[error.code];
      Toast.show({
        type: "error",
        position: "top",
        topOffset: 100,
        text1: "Hoppla!",
        text1Style: { fontSize: 18, color: "red", textAlign: "center" },
        text2: customMessage,
        text2Style: { fontSize: 14, textAlign: "center" },
        visibilityTime: 4000,
        autoHide: true,
        swipeable: true,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Dashboard");
      }
    });
    return unsubscribe;
  }, []);

  return { handleLogin, loading };
};
