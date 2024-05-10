import { useState } from "react";
import { db, auth } from "../firebase";
import Toast from "react-native-toast-message";

const useFriendSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedUsers, setDisplayedUsers] = useState([]);

  const performSearch = async () => {
    if (searchQuery === "") {
      setDisplayedUsers([]);
      return;
    }

    const usersCollection = db.collection("profiles");

    const querySnapshot = await usersCollection
      .where("username", "==", searchQuery)
      .get();

    const searchResults = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const currentUserId = auth.currentUser.uid;
    const filteredResults = searchResults.filter(
      (user) => user.id !== currentUserId
    );
    setDisplayedUsers(filteredResults);
  };

  const handleFriendRequest = async (targetUserId) => {
    const currentUserId = auth.currentUser.uid;

    const checkIfFriends = async (user1Id, user2Id) => {
      const friendsSnapshot = await db
        .collection("users")
        .doc(user1Id)
        .collection("friends")
        .where("userId", "==", user2Id)
        .get();

      return !friendsSnapshot.empty; // True if they are friends
    };

    const isFriend = await checkIfFriends(currentUserId, targetUserId);
    if (isFriend) {
      Toast.show({ type: "info", text1: "You are already friends!" });
      return; // Stop execution
    } else {
      const requestDocRef = db
        .collection("users")
        .doc(targetUserId)
        .collection("friendRequests")
        .doc(currentUserId); // Use targetUserId as the document ID (sender)

      const requestDoc = await requestDocRef.get();

      if (requestDoc.exists) {
        const requestData = requestDoc.data();
        const status = requestData.status;

        // Handle Existing Request based on status
        if (status === "pending") {
          Toast.show({
            type: "error",
            text1: "Friend request already pending.",
          });
        } else if (status === "accepted") {
          Toast.show({
            type: "error",
            text1: "You are already friends with this user.",
          });
        } else if (status === "blocked") {
          Toast.show({
            type: "error",
            text1: "This user is blocked.",
          });
        } else {
          console.log("Unexpected friend request status:", status); // Handle unexpected cases
        }
      } else {
        // Send New Friend Request
        try {
          await requestDocRef.set({
            senderId: currentUserId,
            receiverId: targetUserId,
            status: "pending",
          });
          Toast.show({
            type: "success",
            text1: "Friend request sent!",
          });
        } catch (error) {
          console.error("Error sending friend request:", error);
        }
      }
    }
  };
  return {
    searchQuery,
    setSearchQuery,
    displayedUsers,
    performSearch,
    handleFriendRequest,
  };
};

export default useFriendSearch;
