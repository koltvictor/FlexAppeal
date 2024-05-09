import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../config/styles/FavFriendsStyles";
import useFriendSearch from "../app/hooks/useFriendSearch";
import { Ionicons } from "@expo/vector-icons";
import userStore from "../stores/UserStore";
import { observer } from "mobx-react-lite";

const FavFriends = observer(() => {
  const {
    searchQuery,
    setSearchQuery,
    displayedUsers,
    performSearch,
    handleFriendRequest,
  } = useFriendSearch();
  const [isSearching, setIsSearching] = useState(false);
  const { pendingRequests, isLoadingFriendRequests } = userStore;

  useEffect(() => {
    if (isSearching) {
      performSearch();
      setIsSearching(false);
    }
  }, [isSearching]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for friends"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => setIsSearching(true)}>
          <Text style={styles.searchButton}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultsContainer}>
        {displayedUsers.length > 0 &&
          displayedUsers.map((user) => (
            <View
              key={user.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                backgroundColor: "blue",
              }}
            >
              <Ionicons name={user.icon} size={24} color="white" />
              <Text style={{ color: "white" }}>{user.username}</Text>
              <Ionicons
                name="add-circle-outline"
                size={24}
                color="white"
                onPress={() => handleFriendRequest(user.id)}
              />
            </View>
          ))}
      </View>
      <Text style={styles.title}>Pending Requests</Text>
      <View style={styles.resultsContainer}>
        {isLoadingFriendRequests ? (
          <Text style={{ color: "white" }}>Loading ... </Text>
        ) : (
          pendingRequests.length > 0 &&
          pendingRequests.map((user) => (
            <View
              key={user.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                backgroundColor: "blue",
              }}
            >
              <Ionicons name={user.icon} size={24} color="white" />
              <Text style={{ color: "white" }}>{user.senderUsername}</Text>
            </View>
          ))
        )}

        {pendingRequests.length === 0 && (
          <Text style={{ color: "white" }}>No pending requests</Text>
        )}
      </View>
    </View>
  );
});

export default FavFriends;
