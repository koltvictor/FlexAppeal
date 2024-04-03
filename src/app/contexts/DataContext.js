import React, { createContext } from "react";
import { useQuery } from "react-query";
import { View, Image } from "react-native";

const DataContext = createContext();

const options = {
  headers: {
    "X-RapidAPI-Key": "d6c857720fmsh356f0350f8b9a4cp118c74jsn9858e2ed75fc",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

const fetchExercisesData = async () => {
  const response = await fetch(
    "https://exercisedb.p.rapidapi.com/exercises?limit=1500",
    options
  );
  return response.json();
};

const fetchTargetsData = async (target) => {
  const response = await fetch(
    `https://exercisedb.p.rapidapi.com/exercises?target/${target}`,
    options
  );
  return response.json();
};

const DataContextProvider = ({ children }) => {
  const { data: exercises = [], isLoading: isExercisesLoading } = useQuery(
    "exercises",
    fetchExercisesData
  );

  const { data: targets = [], isLoading: isTargetsLoading } = useQuery(
    "targets",
    () => fetchTargetsData(""),
    { enabled: false }
  );

  if (isExercisesLoading || isTargetsLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 425, height: 425 }}
        />
      </View>
    );
  }

  return (
    <DataContext.Provider value={{ exercises, targets }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
