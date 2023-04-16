import { useQuery } from "react-query";
import { firestore } from "../../../firebase";

const useSavedRoutines = (uid) => {
  console.log(uid);
  const fetchSavedRoutines = async () => {
    const snapshot = await firestore
      .collection("savedRoutines")
      .where("userId", "==", uid)
      .get();

    const savedRoutines = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      exercises: doc.data().exercises,
    }));

    return savedRoutines;
  };

  return useQuery(["savedRoutines", uid], fetchSavedRoutines);
};

export default useSavedRoutines;
