import { queryClient } from "./Provider";

const BASE_URL = "https://exercisedb.p.rapidapi.com";

const fetchExercises = async () => {
  const response = await fetch(`${BASE_URL}/exercises`, {
    headers: {
      "X-RapidAPI-Key": "9074bf701emsh2b8696dac91ac18p161ae0jsn7153acb84d2d",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  });
  return response.json();
};

const fetchTargets = async () => {
  const response = await fetch(`${BASE_URL}/exercises/targetList`, {
    headers: {
      "X-RapidAPI-Key": "9074bf701emsh2b8696dac91ac18p161ae0jsn7153acb84d2d",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  });
  return response.json();
};

const useExercises = () => {
  return queryClient.useQuery("exercises", fetchExercises);
};

const useTargets = () => {
  return queryClient.useQuery("targets", fetchTargets);
};

export { useExercises, useTargets };
