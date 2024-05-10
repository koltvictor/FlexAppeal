import { db, auth } from "../firebase";
import Toast from "react-native-toast-message";
import userStore from "../../stores/UserStore";

const useFriendRequest = () => {
  const handleAcceptRequest = async (requestId) => {
    const currentUserId = auth.currentUser.uid;

    try {
      await db.runTransaction(async (transaction) => {
        const requestDocRef = db
          .collection("users")
          .doc(currentUserId)
          .collection("friendRequests")
          .doc(requestId);
        const requestDoc = await transaction.get(requestDocRef);

        if (!requestDoc.exists) {
          throw new Error("Friend request not found.");
        }

        const senderId = requestDoc.data().senderId;
        const senderRef = db.collection("users").doc(senderId);
        const senderDoc = await transaction.get(senderRef);

        if (!senderDoc.exists) {
          console.log("Sender document not found!");
          return;
        }

        const senderUsername = senderDoc.data().username;

        transaction.update(requestDocRef, { receiverStatus: "accepted" });

        transaction.set(
          db
            .collection("users")
            .doc(currentUserId)
            .collection("friends")
            .doc(senderId),
          {
            userId: senderId,
            username: senderUsername,
          }
        );

        transaction.set(
          db
            .collection("users")
            .doc(senderId)
            .collection("friends")
            .doc(currentUserId),
          {
            userId: currentUserId,
          }
        );

        transaction.delete(requestDocRef);
        const newPendingRequests = userStore.pendingRequests.filter(
          (request) => request.id !== requestId
        );
        userStore.setPendingRequests(newPendingRequests);
      });

      Toast.show({ type: "success", text1: "Friend request accepted!" });
      const friendsSnapshot = await db
        .collection("users")
        .doc(currentUserId)
        .collection("friends")
        .get();

      const friendList = friendsSnapshot.docs.map((doc) => doc.data());
      userStore.setFriends(friendList);
    } catch (error) {
      console.error("Error accepting friend request:", error);
      Toast.show({ type: "error", text1: "Error accepting request." });
    }
  };

  return {
    handleAcceptRequest,
  };
};

export default useFriendRequest;
