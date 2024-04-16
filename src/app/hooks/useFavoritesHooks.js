import { useEffect } from "react";
import { auth, db } from "../firebase";
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

export const handleDelete = async (exerciseToRemove) => {
  try {
    const userId = auth.currentUser.uid;
    const favoritesRef = db.collection("favorites").doc(userId);

    const snapshot = await favoritesRef.get();
    const existingFavorites = snapshot.data().favexercises;

    const updatedFavorites = existingFavorites.filter(
      (fav) => fav.id !== exerciseToRemove.id
    );

    await favoritesRef.set({ favexercises: updatedFavorites });
    favoritesStore.setFavorites(updatedFavorites);
  } catch (error) {
    console.error("Error deleting favorite:", error);
  }
};
