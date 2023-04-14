import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase/index.js";
import { signOut } from "firebase/auth";

const iconHeight = 26;
const iconWidth = 26;

export default function BottomNav({ setIsSignedIn }) {
  let navigate = useNavigation();

  const SignOutUser = () => {
    signOut(auth).then((r) => {
      setIsSignedIn(false);
    });
    navigate.navigate("Welcome");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <StatusBar style="light" />
      </View>
      <View style={styles.NavContainer}>
        <View style={styles.NavBar}>
          <Pressable
            onPress={() => navigate.navigate("dashboard")}
            style={styles.IconBehave}
          >
            <Icon name="home" height={iconHeight} width={iconWidth} />
          </Pressable>
          <Pressable
            onPress={() => navigate.navigate("index")}
            style={styles.IconBehave}
          >
            <Icon name="fitness-center" height={iconHeight} width={iconWidth} />
          </Pressable>
          <Pressable
            onPress={() => navigate.navigate("targets")}
            style={styles.IconBehave}
          >
            <Icon name="star" height={iconHeight} width={iconWidth} />
          </Pressable>
          <Pressable
            onPress={() => navigate.navigate("profile")}
            style={styles.IconBehave}
          >
            <Icon name="person" height={iconHeight} width={iconWidth} />
          </Pressable>
          <Pressable onPress={SignOutUser} style={styles.IconBehave}>
            <Icon name="logout" height={iconHeight} width={iconWidth} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: window.height,
    width: window.width,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  NavContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 10,
  },

  NavBar: {
    flexDirection: "row",
    backgroundColor: "lightblue",
    width: "90%",
    justifyContent: "space-evenly",
    borderRadius: 40,
  },

  IconBehave: {
    padding: 14,
  },
});
