import { View } from "react-native";
import React from "react";
import FavFriends from "../components/FavFriends";
import Friends from "../components/Friends";
import commonStyles from "../config/styles/CommonStyles";

export default function FriendsScreen() {
  return (
    <View style={commonStyles.container}>
      <FavFriends />
      <Friends />
    </View>
  );
}
