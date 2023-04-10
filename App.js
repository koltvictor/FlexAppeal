import React, { useEffect } from "react";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { NativeRouter, Routes, Route } from "react-router-native";
import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import DashboardScreen from "./app/screens/DashboardScreen";
import ExercisesScreen from "./app/screens/ExercisesScreen";
import ExerciseDetailsScreen from "./app/screens/ExerciseDetailsScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import {
  app,
  db,
  getFireStore,
  collection,
  addDoc,
  getDocs,
} from "./firebase/index";

export default function App() {
  const [user, setUser] = React.useState([]);
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

  const getUser = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      setUser({
        ...doc.data(),
        id: doc.id,
      });
      console.log(user.firstName);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

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
        <Route path="/dashboard" element={<DashboardScreen user={user} />} />
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
        <Route path="/exercise/:id" element={<ExerciseDetailsScreen />} />
        <Route path="/profile" element={<ProfileScreen user={user} />} />
      </Routes>
    </NativeRouter>
  );
}
