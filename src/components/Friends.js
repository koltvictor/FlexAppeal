import { View, Text } from "react-native";
import UserContext from "../app/contexts/UserContext";
import { useContext } from "react";
import commonStyles from "../config/styles/CommonStyles";
import { Ionicons } from "@expo/vector-icons";

export default function Friends() {
  const { friends } = useContext(UserContext);

  return (
    <View>
      <Text style={commonStyles.titleText}>Friends</Text>
      {friends.map((friend) => (
        <View key={friend.userId}>
          <Text style={commonStyles.subheaderText}>{friend.username}</Text>
        </View>
      ))}
    </View>
  );
}
