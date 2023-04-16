import React, { useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { DataContext } from "./DataContext";

const SplashScreen = ({ navigation }) => {
  const { exercises } = useContext(DataContext);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Welcome");
    });
  }, [navigation]);

  console.log("navigation prop in SplashScreen:", navigation);
  console.log("fetched exercises:", exercises);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Flex Appeal</Text>
    </View>
  );
};

export default SplashScreen;
