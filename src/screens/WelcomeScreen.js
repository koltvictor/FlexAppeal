import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "Arial",
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
