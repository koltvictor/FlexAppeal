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
  const pendingRequests = [];

  useEffect(() => {
    const onAuthStateChanged = async (userAuth) => {
      try {
        if (userAuth) {
          setUser(userAuth);
          const uid = userAuth.uid;
          userStore.setIsLoadingFriendRequests(true);
          await fetchPendingRequests(uid);
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
          const unsubscribeRequests = db
            .collection("users")
            .doc(uid)
            .collection("friendRequests")
            .where("status", "==", "pending")
            .onSnapshot((snapshot) => {
              const requests = [];
              snapshot.forEach((doc) => {
                const senderId = doc.data().senderId;
                const senderRef = db.collection("users").doc(senderId);
                senderRef.get().then((senderDoc) => {
                  const senderUsername = senderDoc.data()?.username;
                  if (senderUsername) {
                    requests.push({ id: doc.id, senderUsername });
                    userStore.setPendingRequests(requests);
                  }
                });
                userStore.setIsLoadingFriendRequests(false);
              });
            });

          return () => {
            unsubscribeProfile();
            unsubscribeRequests();
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
    const fetchPendingRequests = async (uid) => {
      const pendingRef = db
        .collection("users")
        .doc(uid)
        .collection("friendRequests")
        .where("status", "==", "pending");

      const snapshot = await pendingRef.get();
      const requests = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update MobX directly - will trigger re-render
      userStore.setPendingRequests(requests);
    };
    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogOut = async () => {
    try {
      await auth.signOut().then(() => {
        userStore.setUser(null);
        userStore.setProfile(null);
        favoritesStore.setFavorites([]);
        SecureStore.deleteItemAsync("userCredentials");
      });
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
    handleLogOut,
    handleUpdateProfile,
    pendingRequests,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
