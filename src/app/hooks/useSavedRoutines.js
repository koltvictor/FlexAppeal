import { useState, useEffect } from "react";
import { db, auth } from "../firebase";

export default function useSavedRoutines() {
  const [savedRoutines, setSavedRoutines] = useState([]);
  const [sharedRoutines, setSharedRoutines] = useState([]);
  const [userIdToUsername, setUserIdToUsername] = useState({});

  // fetching savedroutines and sharedroutines from firebase
  useEffect(() => {
    const uid = auth.currentUser.uid;
    const userRef = db.collection("users").doc(uid);
    const unsubscribeUser = userRef.onSnapshot(
      (doc) => {
        const user = doc.data();
        setCurrentUser(user.username);
      },
      (error) => {
        console.error(error);
      }
    );
    const savedRoutinesRef = db
      .collection("savedroutines")
      .where("userId", "==", uid);

    const unsubscribeSavedRoutines = savedRoutinesRef.onSnapshot(
      (snapshot) => {
        const routines = [];
        snapshot.forEach((doc) => {
          const routine = {
            id: doc.id,
            ...doc.data(),
          };
          routines.push(routine);
          console.log(routine);
        });
        setSavedRoutines(routines);
      },
      (error) => {
        console.error(error);
      }
    );
    return () => {
      unsubscribeSavedRoutines();
      unsubscribeUser();
    };
  }, []);

  // map user ids to usernames for shared routines

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      const users = {};
      snapshot.forEach((doc) => {
        const user = doc.data();
        users[doc.id] = user.username;
      });
      setUserIdToUsername(users);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const uid = auth.currentUser.uid;

    // Query for routines that have been shared with the current user
    const savedRoutinesRef = db
      .collection("savedroutines")
      .where("sharedBy", "==", uid);

    console.log(savedRoutinesRef);

    const unsubscribeSavedRoutines = savedRoutinesRef.onSnapshot(
      (snapshot) => {
        const routines = [];
        snapshot.forEach((doc) => {
          const routine = {
            id: doc.id,
            ...doc.data(),
          };
          routines.push(routine);
        });
        setSharedRoutines(routines);
        console.log(routines.length);
        userStore.updateNumSharedRoutines(routines.length);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsubscribeSavedRoutines();
    };
  }, []);

  const combinedRoutines = [
    ...savedRoutines.map((item) => ({ ...item, type: "saved" })),
    ...sharedRoutines.map((item) => ({ ...item, type: "shared" })),
  ];

  return { savedRoutines, sharedRoutines, userIdToUsername, combinedRoutines };
}
