import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../config/styles/FavFriendsStyles";
import useFriendSearch from "../app/hooks/useFriendSearch";

export default function FavFriends() {
  const { searchQuery, setSearchQuery, displayedUsers, performSearch } =
    useFriendSearch();
  const [isSearching, setIsSearching] = useState(false);

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
            <Text key={user.id} style={{ color: "white" }}>
              {user.username}
            </Text>
          ))}
      </View>
    </View>
  );
}
