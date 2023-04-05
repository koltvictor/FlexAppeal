import React, { useEffect } from "react";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { NativeRouter, Routes, Route } from "react-router-native";
import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import DashboardScreen from "./app/screens/DashboardScreen";
import ExercisesScreen from "./app/screens/ExercisesScreen";
import Search from "./app/components/Search";

export default function App() {
  const [exercises, setExercises] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [clicked, setClicked] = React.useState(false);
  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(search.toLowerCase()) ||
      exercise.bodyPart.toLowerCase().includes(search.toLowerCase()) ||
      exercise.equipment.toLowerCase().includes(search.toLowerCase()) ||
      exercise.target.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredExercises.length);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9074bf701emsh2b8696dac91ac18p161ae0jsn7153acb84d2d",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const getExercsises = async () => {
      const response = await fetch(
        "https://exercisedb.p.rapidapi.com/exercises",
        options
      );
      const data = await response.json();
      setExercises(data);
    };
    getExercsises();
  }, []);

  return (
    <NativeRouter>
      <Routes>
        <Route exact path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route
          path="/index"
          element={
            <ExercisesScreen
              filteredExercises={filteredExercises}
              search={search}
              setSearch={setSearch}
              clicked={clicked}
              setClicked={setClicked}
            />
          }
        />
      </Routes>
    </NativeRouter>
  );
}
