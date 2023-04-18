import React, { createContext } from "react";
import { useQuery } from "react-query";
import { Text } from "react-native";

const DataContext = createContext();

const options = {
  headers: {
    "X-RapidAPI-Key": "9074bf701emsh2b8696dac91ac18p161ae0jsn7153acb84d2d",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

const fetchExercisesData = async () => {
  const response = await fetch(
    "https://exercisedb.p.rapidapi.com/exercises",
    options
  );
  return response.json();
};

const fetchTargetsData = async (target) => {
  const response = await fetch(
    `https://exercisedb.p.rapidapi.com/exercises?target=${target}`,
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
    return <Text>Loading...</Text>;
  }

  return (
    <DataContext.Provider value={{ exercises, targets }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
