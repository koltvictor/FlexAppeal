import { useState } from "react";
import { db } from "../firebase";

const useFriendSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedUsers, setDisplayedUsers] = useState([]);

  const performSearch = async () => {
    if (searchQuery === "") {
      setDisplayedUsers([]);
      return;
    }

    const usersCollection = db.collection("users");

    const querySnapshot = await usersCollection
      .where("username", "==", searchQuery)
      .get();

    const searchResults = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDisplayedUsers(searchResults);
  };

  return {
    searchQuery,
    setSearchQuery,
    displayedUsers,
    performSearch,
  };
};

export default useFriendSearch;
