import React, { useEffect } from "react";
import { useNavigate } from "react-router-native";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Search from "../components/Search";

export default function ExercisesScreen() {
  const navigate = useNavigate();
  const [exercises, setExercises] = React.useState([]);
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
  }, []);
  return (
    <SafeAreaView>
      <View>
        <ScrollView vertical="true">
          <Search />
          {exercises.map((exercise, id) => (
            <Text key={id}>{exercise.name}</Text>
          ))}
          <Button
            title="back to dashboard"
            onPress={() => navigate("/dashboard")}
            style={styles.button}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: { position: "absolute", bottom: 0 },
});
