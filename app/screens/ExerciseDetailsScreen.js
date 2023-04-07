import React, { useEffect } from "react";
import { SafeAreaView, Text, Button, Image } from "react-native";
import { useParams } from "react-router-native";
import { useNavigate } from "react-router-native";
import ExerciseCard from "../components/ExerciseCard";

export default function ExerciseDetailsScreen() {
  const [exercise, setExercise] = React.useState([]);
  const id = useParams().id;
  let navigate = useNavigate();

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9074bf701emsh2b8696dac91ac18p161ae0jsn7153acb84d2d",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  function pad(n) {
    return (n < 10 ? "000" : n < 100 ? "00" : n < 1000 ? "0" : "") + n;
  }

  const idNum = pad(id);
  console.log(idNum);
  console.log(id);

  const fetchExercise = async () => {
    const data = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/exercise/${idNum}`,
      options
    );
    const detailData = await data.json();
    setExercise(detailData);
  };

  useEffect(() => {
    fetchExercise();
  }, [id]);

  return (
    <SafeAreaView>
      <ExerciseCard exercise={exercise} id={idNum} />
    </SafeAreaView>
  );
}
