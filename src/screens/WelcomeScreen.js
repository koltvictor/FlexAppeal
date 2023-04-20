import React, { useEffect } from "react";
import { View, Animated, Easing } from "react-native";
import styles from "../config/styles/WelcomeScreenStyles";

export default function WelcomeScreen({ navigation }) {
  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 1000);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.text, { transform: [{ scale: scaleValue }] }]}
      >
        Welcome
      </Animated.Text>
    </View>
  );
}
