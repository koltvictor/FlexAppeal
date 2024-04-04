import { makeObservable, observable, action, runInAction } from "mobx";
import { auth, db } from "../app/firebase";

class FavoritesStore {
  favorites = {
    favexercises: [], // Array to store exercise names
  };

  constructor() {
    makeObservable(this, {
      favorites: observable,
      fetchFavorites: action,
      updateFavorites: action,
    });

    this.fetchFavorites(); // Fetch on initialization
  }

  updateFavorites(newFavorites) {
    runInAction(() => {
      this.favorites.favexercises = newFavorites;
    });
  }

  async fetchFavorites() {
    try {
      const userId = auth.currentUser.uid;
      const favoritesRef = db.collection("favorites").doc(userId);
      const snapshot = await favoritesRef.get();

      if (snapshot.exists) {
        runInAction(() => {
          this.favorites.favexercises = snapshot.data().favexercises || [];
        });
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  }
  setupFirestoreListener() {
    try {
      const userId = auth.currentUser.uid;
      const favoritesRef = db.collection("favorites").doc(userId);

      favoritesRef.onSnapshot((snapshot) => {
        if (snapshot.exists) {
          runInAction(() => {
            this.favorites.favexercises = snapshot.data().favexercises || [];
          });
        }
      });
    } catch (error) {
      console.error("Error setting up Firestore listener:", error);
    }
  }
}

const favoritesStore = new FavoritesStore();
export default favoritesStore;
