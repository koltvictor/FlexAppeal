import { useEffect } from "react";
import { auth, db } from "../firebase";
import userStore from "../../stores/UserStore";

export const useFetchUserProfile = (userId) => {
  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      const profileRef = db.collection("profiles").doc(userId);
      const doc = await profileRef.get();
      if (doc.exists) {
        console.log("Profile fetched:", doc.data());
        userStore.setProfile(doc.data());
      } else {
        console.log("No profile data available");
      }
    };

    fetchProfile();
  }, [userId]);
};

export const useFetchSavedRoutines = (userId) => {
  useEffect(() => {
    const fetchSavedRoutines = async () => {
      const savedRoutinesRef = db.collection("savedroutines");
      const query = savedRoutinesRef.where("userId", "==", userId);
      const querySnapshot = await query.get();
      const savedRoutines = {};
      querySnapshot.forEach((doc) => {
        const routineName = doc.id.split("_")[1];
        savedRoutines[routineName] = doc.data();
      });
      userStore.setSavedRoutines(savedRoutines);
    };

    fetchSavedRoutines();
  }, [userId, userStore.savedRoutines]);
};
