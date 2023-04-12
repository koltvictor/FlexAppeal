import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React from "react";
import TargetCard from "../components/TargetCard";

export default function TargetsScreen({ targets }) {
  return (
    <SafeAreaView>
      <View>
        <Text>hey</Text>
        <ScrollView vertical="true">
          {targets.map((target) => {
            return <TargetCard target={target} />;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
