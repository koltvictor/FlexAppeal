import React from "react";
import colors from "../config/colors";
import { View, StyleSheet, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

function WelcomeScreen() {
  const navigate = useNavigation();
  return (
    <View
      style={styles.background}
      //   source={require("../assets/blue.jpeg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/FAL1.png")} />
      </View>
      <View style={styles.loginButton}>
        <Button
          style={styles.buttonText}
          title="Login"
          color={colors.white}
          onPress={() => navigate.navigate("Login")}
        />
      </View>
      <View style={styles.registerButton}>
        <Button
          style={styles.buttonText}
          title="Register"
          color={colors.white}
          onPress={() => navigate.navigate("Signup")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  buttonText: {
    textAlign: "center",
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.tertiary,
  },
  logo: {
    width: 200,
    height: 200,
    position: "absolute",
    top: 70,
  },
  logoContainer: {
    flex: 1,
    position: "absolute",
    top: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.quaternary,
  },
});

export default WelcomeScreen;
