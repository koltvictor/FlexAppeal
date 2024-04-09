import { useState, useEffect } from "react";

const useExerciseSearch = (exercises) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedExercises, setDisplayedExercises] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const searchWords = searchQuery.toLowerCase().split(" "); // Split into words

    const filteredSubset = exercises
      ? exercises.filter((exercise) => {
          return searchWords.every((word) => {
            return (
              exercise.name.toLowerCase().includes(word) ||
              exercise.bodyPart.toLowerCase().includes(word) ||
              exercise.equipment.toLowerCase().includes(word) ||
              exercise.target.toLowerCase().includes(word)
            );
          });
        })
      : [];
    setDisplayedExercises(filteredSubset.slice(0, 20)); // Initially display first 20
    setOffset(0);
  }, [searchQuery, exercises]);

  const loadMore = () => {
    setIsLoadingMore(true);

    const filteredSubset = exercises
      ? exercises.filter(
          (exercise) =>
            exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exercise.bodyPart
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            exercise.equipment
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            exercise.target.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

    // Check if filteredSubset is not empty
    if (filteredSubset.length > 0) {
      setDisplayedExercises((prevExercises) => [
        ...prevExercises,
        ...filteredSubset.slice(offset + 20, offset + 40),
      ]);
    }

    setOffset(offset + 20);
    setIsLoadingMore(false);
  };

  return {
    searchQuery,
    setSearchQuery,
    displayedExercises,
    isLoadingMore,
    loadMore, // Expose state and functions
  };
};

export default useExerciseSearch;
