import React, { useState, useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import * as SecureStore from "expo-secure-store";
import { auth } from "../app/firebase/index.js";
import styles from "../config/styles/SplashScreenStyles";

const SplashScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    const checkLogin = async () => {
      console.log(
        "Stored Credentials:",
        await SecureStore.getItemAsync("userCredentials")
      );
      const storedCredentials = await SecureStore.getItemAsync(
        "userCredentials"
      );

      if (storedCredentials) {
        try {
          const { email, password } = JSON.parse(storedCredentials);
          await auth.signInWithEmailAndPassword(email, password);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Firebase re-auth error:", error);
          // Optionally: clear credentials on re-authentication failure
          // await SecureStore.deleteItemAsync("userCredentials");
        }
      }
      setAuthLoading(false);
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (authLoading) return;

    setTimeout(() => {
      if (isLoggedIn) {
        navigation.navigate("Dashboard");
      } else {
        navigation.navigate("Login");
      }
    }, 500);
  }, [authLoading, isLoggedIn, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.textContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.textFlex}>Flex</Text>
        <Text style={styles.textAppeal}>Appeal</Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

// useEffect(() => {
//   if (authLoading) return;

//   // Fade in animation
//   Animated.timing(fadeAnim, {
//     toValue: 1,
//     duration: 1000,
//     useNativeDriver: true,
//   }).start();

//   // Slide animation
//   Animated.timing(slideAnim, {
//     toValue: 0,
//     duration: 1000,
//     useNativeDriver: true,
//   }).start();

//   // Navigate to Login screen after 2 seconds
//   setTimeout(() => {
//     isLoggedIn
//       ? navigation.navigate("Dashboard")
//       : navigation.navigate("Login");
//   }, 2000);
// }, [fadeAnim, navigation, slideAnim]);
