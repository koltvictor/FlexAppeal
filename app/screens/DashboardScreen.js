import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import BottomNav from "../components/BottomNav";

export default function DashboardScreen({ user }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome, {user.firstName} !</Text>
        <Text>
          Utitlise the button below to see an index of exercises and search{" "}
        </Text>
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
    margin: 20,
    // marginLeft: 20,
  },
});
