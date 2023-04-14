import React, { useEffect } from "react";
import { View, Text } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 3000); // Wait 3 seconds before navigating to the next screen
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Flex Appeal</Text>
    </View>
  );
};

export default SplashScreen;
