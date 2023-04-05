import React from "react";
import { useNavigate } from "react-router-native";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignupScreen() {
  const navigate = useNavigate();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput placeholder="first name" />
        <TextInput placeholder="last name" />
        <TextInput placeholder="email address" />
        <TextInput placeholder="password" />
        <TextInput placeholder="confirm password" />
      </View>
      <Button title="back to login" onPress={() => navigate("/")} />
      <Button title="register" onPress={() => navigate("/dashboard")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50%",
  },
});
