import React, { useState, useEffect, createContext } from "react";
import {
  auth,
  db,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "../firebase/index";
import userStore from "../../stores/UserStore";

const UserContext = createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        setUser(userAuth);
        const uid = userAuth.uid;
        const profileDoc = doc(db, "profiles", uid);
        const unsubscribeProfile = onSnapshot(profileDoc, (profileSnapshot) => {
          if (profileSnapshot.exists()) {
            setProfile(profileSnapshot.data());
          } else {
            console.log("No such document!");
          }
        });
        return () => unsubscribeProfile();
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async (email, password, username) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const uid = user.uid;
      const profileDoc = doc(db, "profiles", uid);
      const profileData = { email, username, icon: "" };
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
      if (profileSnapshot.exists()) {
        userStore.setProfile(profileSnapshot.data());
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
      const updatedProfileDoc = await getDoc(profileDocRef);
      const updatedProfile = updatedProfileDoc.data();
      userStore.setProfile(updatedProfile); // update userStore instead of state
      setProfile(updatedProfile);
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  const value = {
    user,
    profile,
    handleSignUp,
    handleLogIn,
    handleLogOut,
    handleUpdateProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
