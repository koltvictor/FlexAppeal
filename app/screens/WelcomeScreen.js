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

function WelcomeScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/crumpledwhite.jpeg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/FAL1.png")} />
        <Text>Get Fit</Text>
      </View>
      <View style={styles.loginButton}>
        <Button style={styles.buttonText} title="Login" color={colors.white} />
      </View>
      <View style={styles.registerButton}>
        <Button
          style={styles.buttonText}
          title="Register"
          color={colors.black}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.primary,
  },
  logo: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 70,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.secondary,
  },
});

export default WelcomeScreen;
