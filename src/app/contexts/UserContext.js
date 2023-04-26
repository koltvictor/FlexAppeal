import React, { useState, useEffect, createContext } from "react";
import { auth, db, doc, setDoc, getDoc, updateDoc } from "../firebase/index";
import userStore from "../../stores/UserStore";
import { onSnapshot } from "firebase/firestore";

const UserContext = createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [savedroutines, setSavedRoutines] = useState(null);
  const [unsubscribeProfile, setUnsubscribeProfile] = useState(null);

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
          // Call the unsubscribe function inside the onAuthStateChanged callback
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

  const handleSignUp = async (email, password, username) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const uid = user.uid;
      const profileDoc = doc(db, "profiles", uid);
      const profileData = { email, username, icon };
      await setDoc(profileDoc, profileData);
      userStore.setProfile(profileData);
      setUser(user);
      return { success: true };
    } catch (error) {
      console.log("Error signing up: ", error);
      return { success: false, message: error.message };
    }
  };

  const handleLogIn = async (email, password) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const uid = user.uid;
      const profileDoc = doc(db, "profiles", uid);
      const profileSnapshot = await getDoc(profileDoc);
      const savedroutinesDoc = doc(db, "savedroutines", uid);
      const savedroutinesSnapshot = await getDoc(savedroutinesDoc);
      if (profileSnapshot.exists()) {
        userStore.setProfile(profileSnapshot.data());
      } else {
        console.log("No such document!");
      }
      if (savedroutinesSnapshot.exists()) {
        userStore.setSavedRoutines(savedroutinesSnapshot.data());
      } else {
        console.log("No such document!");
      }
      setUser(user);
      userStore.setUser(user);
      return { success: true };
    } catch (error) {
      console.log("Error logging in: ", error);
      return { success: false, message: error.message };
    }
  };

  const handleLogOut = async () => {
    try {
      await auth.signOut();
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
    handleSignUp,
    handleLogIn,
    handleLogOut,
    handleUpdateProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
