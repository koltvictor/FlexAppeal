import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React from "react";
import TargetCard from "../components/TargetCard";
import BottomNav from "../components/BottomNav";

export default function TargetsScreen({ targets }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <Text>hey</Text> */}
        <ScrollView vertical="true" style={styles.listContainer}>
          {targets.map((target) => {
            return <TargetCard target={target} />;
          })}
        </ScrollView>
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

  listContainer: {
    marginBottom: 83,
  },
});
