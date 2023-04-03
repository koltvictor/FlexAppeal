import React, { useEffect } from "react";
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
  const [exercises, setExercises] = React.useState([]);
  const navigate = useNavigate();
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9074bf701emsh2b8696dac91ac18p161ae0jsn7153acb84d2d",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };
  useEffect(() => {
    fetch("https://exercisedb.p.rapidapi.com/exercises", options)
      .then((r) => r.json())
      .then((data) => setExercises(data));
    //   .catch((err) => console.error(err));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View style={{ backgroundColor: "black", flex: 1 }} />
      <View style={{ backgroundColor: "red", flex: 1 }} />
      <View style={{ backgroundColor: "gold", flex: 1 }} /> */}
      <Text>DashboardScreen</Text>
      <Text>
        {exercises.map((exercise) => (
          <Text>{exercise.name}</Text>
        ))}
      </Text>
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
