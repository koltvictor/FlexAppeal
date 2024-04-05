import { useEffect } from "react";
import { db } from "../firebase";
import favoritesStore from "../../stores/FavoritesStore";

export const useFetchFavoriteExercises = (userId) => {
  useEffect(() => {
    if (!userId) return;

    const fetchFavoriteExercises = async () => {
      const favoritesRef = db.collection("favorites").doc(userId);
      const doc = await favoritesRef.get();
      if (doc.exists) {
        favoritesStore.setFavorites(doc.data().favexercises || []);
      } else {
        console.log("No favorite exercises data available");
      }
    };
    fetchFavoriteExercises();
  }, [userId]);
};
