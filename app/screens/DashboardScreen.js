import React from "react";
import { useNavigate } from "react-router-native";
import { Button, SafeAreaView, Text } from "react-native";

export default function DashboardScreen() {
  const navigate = useNavigate();
  return (
    <SafeAreaView>
      <Text>DashboardScreen</Text>
      <Button title="back to login" onPress={() => navigate("/")} />
    </SafeAreaView>
  );
}
