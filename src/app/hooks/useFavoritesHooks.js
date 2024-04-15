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

    // Get current favorites
    const snapshot = await favoritesRef.get();
    const existingFavorites = snapshot.data().favexercises;

    // Filter out the exercise to remove
    const updatedFavorites = existingFavorites.filter(
      (fav) => fav !== exerciseToRemove
    );

    // Update Firestore
    await favoritesRef.set({ favexercises: updatedFavorites });

    // Update MobX store (for immediate UI refresh)
    favoritesStore.setFavorites(updatedFavorites);
  } catch (error) {
    console.error("Error deleting favorite:", error);
    // Handle error (e.g., display an error message to the user)
  }
};
