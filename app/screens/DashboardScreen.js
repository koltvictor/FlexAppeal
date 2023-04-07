import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import BottomNav from "../components/BottomNav";

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome, user !</Text>
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
