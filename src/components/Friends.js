import { View, Text } from "react-native";
import UserContext from "../app/contexts/UserContext";
import { useContext } from "react";

export default function Friends() {
  const { friends } = useContext(UserContext);

  return (
    <View>
      <Text style={{ color: "white" }}>Friends</Text>
      {friends.map((friend) => (
        <View key={friend.userId}>
          <Text style={{ color: "white" }}>{friend.username}</Text>
        </View>
      ))}
    </View>
  );
}
