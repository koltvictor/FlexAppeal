import React, { useEffect, useState } from "react";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { NativeRouter, Routes, Route } from "react-router-native";
import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import DashboardScreen from "./app/screens/DashboardScreen";
import ExercisesScreen from "./app/screens/ExercisesScreen";
import ExerciseDetailsScreen from "./app/screens/ExerciseDetailsScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import { app, db, collection, addDoc, getDocs } from "./firebase/index";
import TargetsScreen from "./app/screens/TargetsScreen";
import TargetCard from "./app/components/TargetCard";
import GroupsScreen from "./app/screens/GroupsScreen";

export default function App() {
  const [currentUser, setCurrentUser] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [targets, setTargets] = useState([]);
  const [specificTargets, setSpecificTargets] = useState([]);
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(search.toLowerCase()) ||
      exercise.bodyPart.toLowerCase().includes(search.toLowerCase()) ||
      exercise.equipment.toLowerCase().includes(search.toLowerCase()) ||
      exercise.target.toLowerCase().includes(search.toLowerCase())
  );

  // API fetch

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

  // Firebase fetch

  const getUser = async (uid) => {
    const querySnapshot = await getDocs(collection(db, "users", uid));
    querySnapshot.forEach((doc) => {
      setCurrentUser({
        ...doc.data(),
        id: doc.id,
      });
    });
  };

  useEffect(() => {
    getUser();
  }, [setCurrentUser]);

  // API fetch targets

  useEffect(() => {
    const getTargets = async () => {
      const response = await fetch(
        "https://exercisedb.p.rapidapi.com/exercises/targetList",
        options
      );
      const data = await response.json();
      setTargets(data);
    };
    getTargets();
  }, []);

  // API fetch list by targets

  return (
    <NativeRouter>
      <Routes>
        <Route exact path="/" element={<WelcomeScreen />} />
        <Route
          path="/login"
          element={<LoginScreen setIsSignedIn={setIsSignedIn} />}
        />
        <Route
          path="/signup"
          element={
            <SignupScreen
              isSignedIn={isSignedIn}
              setIsSignedIn={setIsSignedIn}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardScreen
              currentUser={currentUser}
              isSignedIn={isSignedIn}
              setIsSignedIn={setIsSignedIn}
            />
          }
        />
        <Route path="/targets" element={<TargetsScreen targets={targets} />} />
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
        <Route
          path="/profile"
          element={<ProfileScreen currentUser={currentUser} />}
        />
        <Route path="/:target" element={<GroupsScreen />} />
      </Routes>
    </NativeRouter>
  );
}

// const getUser = async () => {
//   const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//     setUser({
//       ...doc.data(),
//       id: doc.id,
//     });
//     console.log(user.firstName);
//   });
// };

// useEffect(() => {
//   getUser();
// }, [setUser]);
