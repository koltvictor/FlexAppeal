import { queryClient } from "./providers/Provider";

const BASE_URL = "https://exercisedb.p.rapidapi.com";

const fetchExercises = async () => {
  const response = await fetch(`${BASE_URL}/exercises`, {
    headers: {
      "X-RapidAPI-Key": "d6c857720fmsh356f0350f8b9a4cp118c74jsn9858e2ed75fc",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  });
  return response.json();
};

const fetchTargets = async () => {
  const response = await fetch(`${BASE_URL}/exercises/targetList`, {
    headers: {
      "X-RapidAPI-Key": "d6c857720fmsh356f0350f8b9a4cp118c74jsn9858e2ed75fc",
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
