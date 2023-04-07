import React from "react";
import { Button, Image, Text, View } from "react-native";
import { useNavigate, useParams } from "react-router-native";

export default function ExerciseCard({ exercise, idNum }) {
  let navigate = useNavigate();
  let id = useParams().id;
  return (
    <View>
      <Button onPress={() => navigate("/index")} title="back to exercises" />
      <Text>
        This is the exercise name: {exercise.name} with an id of {exercise.id}{" "}
        and idNum:{idNum} and key: {id}
      </Text>
      <Image
        source={{ uri: exercise.gifUrl }}
        alt={"gif"}
        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
      />
    </View>
  );
}
