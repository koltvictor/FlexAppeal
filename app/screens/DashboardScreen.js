import React from "react";
import { useNavigate } from "react-router-native";
import {
  Button,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function DashboardScreen() {
  const navigate = useNavigate();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "black", flex: 1 }} />
      <View style={{ backgroundColor: "red", flex: 1 }} />
      <View style={{ backgroundColor: "gold", flex: 1 }} />
      <Text>DashboardScreen</Text>
      <Button title="back to login" onPress={() => navigate("/")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    flex: 1,
  },
});
