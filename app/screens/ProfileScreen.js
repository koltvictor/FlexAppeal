import { Button } from "@rneui/base";
import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, SafeAreaView } from "react-native";
import { useNavigate } from "react-router-native";
import BottomNav from "../components/BottomNav";
import {
  db,
  doc,
  updateDoc,
} from "/Users/kolt/Development/FlexAppeal/DoneWithIt/firebase/index.js";
export default function ProfileScreen({ user }) {
  let navigate = useNavigate();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>
          {user.firstName} {user.lastName}
        </Text>
        <Text>{user.email}</Text>
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
    // marginBottom: 100,
    paddingVertical: 20,
    marginLeft: 20,
  },
});
