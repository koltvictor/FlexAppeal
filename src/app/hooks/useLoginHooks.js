import { auth } from "../firebase/index.js"; // Import auth
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react"; // Import useState
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let navigation = useNavigation();

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is authenticated, handle it appropriately (e.g., navigation)
        console.log("User logged in:", user);
        navigation.navigate("Dashboard");
      }
    });

    return unsubscribe; // Cleanup function for unsubscription
  }, []);

  return { handleLogin, loading, error };
};
