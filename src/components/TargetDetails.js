import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";

export default function TargetDetails({ target }) {
  const [exercise, setExercise] = useState([]);
  //   console.log(target);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9074bf701emsh2b8696dac91ac18p161ae0jsn7153acb84d2d",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  const fetchExercise = async () => {
    const data = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/exercise/${target.id}`,
      options
    );
    const detailData = await data.json();
    setExercise(detailData);
  };

  useEffect(() => {
    fetchExercise();
  }, []);
  return (
    <View>
      <Text>{target}</Text>
    </View>
  );
}
