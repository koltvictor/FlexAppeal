import { useState, useEffect, createContext } from "react";
import { auth, db, doc, getDoc, updateDoc } from "../firebase/index";
import userStore from "../../stores/UserStore";
import favoritesStore from "../../stores/FavoritesStore";
import { onSnapshot } from "firebase/firestore";
import * as SecureStore from "expo-secure-store";

const UserContext = createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [savedroutines, setSavedRoutines] = useState(null);

  useEffect(() => {
    const onAuthStateChanged = async (userAuth) => {
      try {
        if (userAuth) {
          setUser(userAuth);
          const uid = userAuth.uid;
          const profileDoc = doc(db, "profiles", uid);
          const unsubscribeProfile = onSnapshot(
            profileDoc,
            (profileSnapshot) => {
              if (profileSnapshot.exists()) {
                setProfile(profileSnapshot.data());
              } else {
                console.log("No such document!");
              }
            }
          );
          const unsubscribe = () => {
            unsubscribeProfile();
          };
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.log("Error in onAuthStateChanged: ", error);
      }
    };
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      userStore.setUser(null);
      userStore.setProfile(null);
      favoritesStore.favorites = [];
      await SecureStore.deleteItemAsync("userCredentials");
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  const handleUpdateProfile = async (username, icon) => {
    try {
      const uid = user.uid;
      const profileDocRef = doc(db, "profiles", uid);
      const updatedFields = {};
      if (username) {
        updatedFields.username = username;
      }
      if (icon) {
        updatedFields.icon = icon;
      }
      await updateDoc(profileDocRef, updatedFields);
      console.log("Profile updated successfully");

      // Update userStore
      const updatedProfileDoc = await getDoc(profileDocRef);
      const updatedProfile = updatedProfileDoc.data();
      userStore.setProfile(updatedProfile);

      // Update local state
      setProfile(updatedProfile);
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  const value = {
    user,
    profile,
    savedroutines,
    handleLogOut,
    handleUpdateProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
