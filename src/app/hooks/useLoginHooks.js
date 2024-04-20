import { auth } from "../firebase/index.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let navigation = useNavigation();

  const firebaseErrorMessages = {
    "auth/user-not-found": "User not found",
    "auth/wrong-password": "Incorrect password",
    "auth/invalid-email": "Invalid email",
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
      const customMessage =
        firebaseErrorMessages[error.code] || "An Unknown Error Occurred";
      setError(customMessage);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Hoppla!",
        text2: customMessage,
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

  return { handleLogin, loading, error };
};
