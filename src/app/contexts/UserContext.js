import { useState, useEffect, createContext } from "react";
import { auth, db, doc, getDoc, updateDoc } from "../firebase/index";
import userStore from "../../stores/UserStore";
import favoritesStore from "../../stores/FavoritesStore";
import { onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import * as SecureStore from "expo-secure-store";

const UserContext = createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const pendingRequests = [];
  const [friends, setFriends] = useState([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(false);
  const [fetchFriendsError, setFetchFriendsError] = useState(null);

  useEffect(() => {
    let unsubscribeFriends = null;

    const fetchFriends = async () => {
      setIsLoadingFriends(true);
      setFetchFriendsError(null);

      if (user) {
        const currentUserId = user.uid;

        try {
          unsubscribeFriends = onSnapshot(
            db.collection("users").doc(currentUserId).collection("friends"),
            (snapshot) => {
              const updatedFriends = snapshot.docs.map((doc) => doc.data());
              setFriends(updatedFriends);
              userStore.setFriends(updatedFriends);
              console.log("userStore friends", userStore.friends);
            },
            (error) => {
              console.error("Error fetching friends:", error);
              setFetchFriendsError(error);
            }
          );
        } catch (error) {
          console.error("Error fetching friends:", error);
          setFetchFriendsError(error);
        } finally {
          setIsLoadingFriends(false);
        }
      }
    };

    if (user) {
      fetchFriends();
    } else {
      setFriends([]);
      userStore.setFriends([]);
    }

    return () => {
      if (unsubscribeFriends) {
        unsubscribeFriends();
      }
    };
  }, [user]);

  const fetchPendingRequests = async (uid) => {
    const pendingRef = db
      .collection("users")
      .doc(uid)
      .collection("friendRequests")
      .where("status", "==", "pending")
      .where("receiverId", "==", uid)
      .orderBy("senderId", "_name_");

    const snapshot = await pendingRef.get();
    const requests = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    userStore.setPendingRequests(requests);
  };

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

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogOut = async () => {
    try {
      await auth.signOut().then(() => {
        userStore.setUser(null);
        userStore.setProfile(null);
        userStore.setFriends([]);
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
      let updatedIcon = icon; // Store a copy of the icon

      if (icon && icon.startsWith("file://")) {
        // Handle only if it's a local file URI

        const storage = getStorage();
        const filename = icon.substring(icon.lastIndexOf("/") + 1);
        const storageRef = ref(storage, `profileImages/${uid}/${filename}`);

        // Fetch and Convert Image Data to Blob
        const response = await fetch(icon);
        if (!response.ok) {
          throw new Error(`Error fetching image: ${response.status}`);
        }
        const blob = await response.blob();

        // Upload Image to Storage
        await uploadBytes(storageRef, blob);

        // Get Download URL from Storage
        const imageUrl = await getDownloadURL(storageRef);
        updatedIcon = imageUrl;
      }

      if (username) {
        updatedFields.username = username;
      }
      if (icon) {
        updatedFields.icon = updatedIcon;
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
    friends,
    isLoadingFriends,
    fetchFriendsError,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
