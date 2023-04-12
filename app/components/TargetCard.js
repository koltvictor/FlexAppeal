import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-native";

export default function TargetCard({ target }) {
  let navigate = useNavigate();

  return (
    <View style={styles.card}>
      <Text key={target.id} onPress={() => navigate(`/${target}`)}>
        {target}
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
