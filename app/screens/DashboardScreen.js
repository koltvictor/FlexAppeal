import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { useLocation } from "react-router-native";

export default function DashboardScreen({
  isSignedIn,
  setIsSignedIn,
  currentUser,
}) {
  const location = useLocation();
  console.log(location.state);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome, {currentUser.email} !</Text>
        <Text>
          Utitlise the button below to see an index of exercises and search{" "}
        </Text>
      </View>
      <BottomNav isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
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
