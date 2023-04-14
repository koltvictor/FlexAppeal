import { Button } from "@rneui/base";
import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, SafeAreaView } from "react-native";
import { useNavigation } from "react-router-native";
import BottomNav from "../components/BottomNav";
import {
  db,
  doc,
  updateDoc,
} from "/Users/kolt/Development/FlexAppeal/DoneWithIt/firebase/index.js";
import { Form, FormItem } from "react-native-form-component";

export default function ProfileScreen() {
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();

  const UserProfileScreen = () => {
    const navigation = useNavigation();
    const { data: user } = useFirestore().useUser();
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{user?.displayName}</Text>
        <Text>{user?.email}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("UpdateProfile")}>
          <Text>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{/* {currentUser.firstName} {currentUser.lastName} */}</Text>
        {/* <Text>{currentUser.email}</Text> */}
        <View>
          <TextInput
            value={firstName}
            onChangeText={(firstName) => setFirstName(firstName)}
            placeholder="update name"
          />
          <Button title="update" onPress={console.log("updating")} />
        </View>
        <TextInput />
      </View>
      <BottomNav />
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
