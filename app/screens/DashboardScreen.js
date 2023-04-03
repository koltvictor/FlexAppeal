import React from "react";
import { useNavigate } from "react-router-native";
import {
  Button,
  Link,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ExercisesScreen from "./ExercisesScreen";

export default function DashboardScreen() {
  const navigate = useNavigate();

  return (
    <SafeAreaView>
      <Text>DashboardScreen</Text>
      <Button title="exercises" onPress={() => navigate("/index")} />
      <Button onPress={() => navigate("/")} title="back to welcome" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    flex: 1,
  },
});
