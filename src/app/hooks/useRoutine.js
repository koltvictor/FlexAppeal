import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import routineStore from "../../stores/RoutineStore";
import { useNavigation } from "@react-navigation/native";

export const useRoutine = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [routineName, setRoutineName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cycles, setCycles] = useState(1);
  let navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = routineStore.subscribeToRoutineChanges();
    return unsubscribe;
  }, []);

  const handleSaveRoutine = async () => {
    if (!routineName || !/^\s*([a-zA-Z0-9]+\s*)+$/.test(routineName)) {
      setErrorMessage("Please give your routine a name");
      return;
    }
    const invalidInput = /[^a-zA-Z0-9\s]/.test(routineName);
    if (invalidInput) {
      setErrorMessage("Please only use letters and numbers!");
      return;
    }
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("Error saving routine: User is not authenticated");
        alert("Please sign in to save routines");
        return;
      }
      const uid = user.uid;
      const routineId = `${uid}_${routineName}`;
      const savedRoutineRef = db.collection("savedroutines").doc(routineId);

      const routineData = {
        exercises: routineStore.routine.map((exercise) => {
          return {
            ...exercise,
            reps: exercise.reps || null,
            time: exercise.time || null,
            rest: exercise.rest || null,
          };
        }),
        userId: uid,
        name: routineName,
        numberOfCycles: parseInt(cycles),
      };
      await savedRoutineRef.set(routineData, { merge: true });
      routineStore.clearRoutine();
      setRoutineName("");
      setCycles(1);
    } catch (error) {
      console.error("Error saving routine:", error);
    }
    setIsModalVisible(false);
    navigation.navigate("Saved Routines");
  };

  const onCancel = () => {
    setIsModalVisible(false);
    setRoutineName("");
    setErrorMessage("");
    setCycles("");
  };

  const handleRepsChange = (exerciseId, value) => {
    routineStore.handleRepsChange(exerciseId, value);
  };

  const handleTimeChange = (index, value) => {
    routineStore.handleTimeChange(index, value);
  };

  return {
    isModalVisible,
    setIsModalVisible,
    routineName,
    setRoutineName,
    errorMessage,
    setErrorMessage,
    cycles,
    setCycles,
    handleSaveRoutine,
    onCancel,
    handleRepsChange,
    handleTimeChange,
  };
};
