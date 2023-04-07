import { Button } from "@rneui/base";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useNavigate } from "react-router-native";
import BottomNav from "../components/BottomNav";

export default function ProfileScreen() {
  let navigate = useNavigate();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>ProfileScreen</Text>
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
