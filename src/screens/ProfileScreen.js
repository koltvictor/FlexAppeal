import { Button } from "@rneui/base";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, SafeAreaView } from "react-native";
import { useNavigation } from "react-router-native";
import { db, doc, auth, updateDoc } from "../../firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ProfileScreen({ navigation }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const handleUpdateUsername = async () => {
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      username: username,
    });
    console.log("username updated successfully");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Icon name="account-circle" size={100} />
        {/* <Text>{currentUser ? currentUser.username : ""}</Text> */}
        <Text>{currentUser ? currentUser.email : ""}</Text>
      </View>
      <Button
        onPress={() => {
          navigation.navigate("Update Profile");
        }}
      >
        Update Profile
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: window.height,
    width: window.width,
    paddingVertical: 20,
    margin: 20,
  },
});
