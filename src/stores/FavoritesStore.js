import { makeObservable, observable, action, runInAction } from "mobx";
import { auth, db } from "../app/firebase";

class FavoritesStore {
  favorites = {
    favexercises: [], // Array to store exercise names
  };

  constructor() {
    makeObservable(this, {
      isLoading: false,
      favorites: observable,
      setFavorites: action,
      fetchFavorites: action,
      updateFavorites: action,
    });
    this.fetchFavorites(); // Fetch on initialization
  }

  setFavorites(favorites) {
    this.favorites = favorites;
  }

  updateFavorites(newFavorites) {
    console.log("newFavorites", newFavorites);
    console.log("favorites before update:", this.favorites);

    runInAction(() => {
      // Initialize favexercises if not already present
      if (!this.favorites) {
        this.favorites = { favexercises: [] };
      } else if (!this.favorites.favexercises) {
        this.favorites.favexercises = [];
      }

      // Now safely replace the values
      this.favorites.favexercises.replace(newFavorites);
    });
  }

  async fetchFavorites() {
    this.isLoading = true;
    try {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const favoritesRef = db.collection("favorites").doc(userId);
        const snapshot = await favoritesRef.get();

        if (snapshot.exists) {
          runInAction(() => {
            this.favorites.favexercises = snapshot.data().favexercises || [];
          });
        } else {
          console.log("No favorites data available");
        }
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      this.isLoading = false;
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
