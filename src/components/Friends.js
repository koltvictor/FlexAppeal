import { View, Text, Image } from "react-native";
import UserContext from "../app/contexts/UserContext";
import { useContext } from "react";
import commonStyles from "../config/styles/CommonStyles";

export default function Friends() {
  const { friends } = useContext(UserContext);

  return (
    <View>
      <Text style={commonStyles.titleText}>Friends</Text>
      {friends.map((friend) => (
        <View key={friend.userId}>
          <Text style={commonStyles.subheaderText}>{friend.username}</Text>
          <Image
            source={{ uri: friend.userIcon }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        </View>
      ))}
    </View>
  );
}
