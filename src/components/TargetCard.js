import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-native";
import TargetDetails from "./TargetDetails";

export default function TargetCard({ target }) {
  let navigate = useNavigate();

  return (
    <View style={styles.card} key={target.id}>
      <Text key={target.id} onPress={() => navigate(`/${target}`)}>
        <TargetDetails target={target} key={target.id} />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
  },
});
