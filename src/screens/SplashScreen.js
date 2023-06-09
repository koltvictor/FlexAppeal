import React, { useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../config/styles/SplashScreenStyles";

const SplashScreen = () => {
  const navigation = useNavigation();

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Slide animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Navigate to Login screen after 2 seconds
    setTimeout(() => {
      navigation.navigate("Login");
    }, 2000);
  }, [fadeAnim, navigation, slideAnim]);

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
