import React from "react";
import colors from "../config/colors";
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  Button,
} from "react-native";
import { useNavigate } from "react-router-native";

function WelcomeScreen({}) {
  const navigate = useNavigate();
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
          onPress={() => navigate("/login")}
        />
      </View>
      <View style={styles.registerButton}>
        <Button
          style={styles.buttonText}
          title="Register"
          color={colors.white}
          onPress={() => navigate("/signup")}
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
    justifyContent: "center",
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
