import { useState, useEffect } from "react";
import { useQuery } from "react-query";

const useExerciseDetails = (exerciseId, options) => {
  const [exerciseDetails, setExerciseDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: fetchedExercise } = useQuery(["exercise", exerciseId], () =>
    fetch(
      `https://exercisedb.p.rapidapi.com/exercises/exercise/${exerciseId}`,
      options
    ).then((res) => res.json())
  );

  useEffect(() => {
    if (fetchedExercise) {
      setExerciseDetails(fetchedExercise);
      setIsLoading(false);
    }
  }, [fetchedExercise]);

  return { exerciseDetails, isLoading };
};

export default useExerciseDetails;
