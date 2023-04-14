import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { queryClient } from "../app/Provider";
import { useQuery } from "@tanstack/react-query";

export default function DashboardScreen({
  isSignedIn,
  setIsSignedIn,
  currentUser,
}) {
  const { data } = useQuery({
    queryKey: ["foo"],
    queryFn: () => {
      queryClient.getQueryData(["foo"]);
    },
  });

  console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome, !</Text>
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
