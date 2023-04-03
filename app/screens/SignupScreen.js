import React from "react";
import { useNavigate } from "react-router-native";
import { Button, SafeAreaView, Text } from "react-native";

export default function SignupScreen() {
  const navigate = useNavigate();
  return (
    <SafeAreaView>
      <Text>SignupScreen</Text>
      <Button title="back to login" onPress={() => navigate("/")} />
      <Button title="dashboard" onPress={() => navigate("/dashboard")} />
    </SafeAreaView>
  );
}
