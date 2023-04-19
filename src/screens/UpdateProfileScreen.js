import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Button } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import UserContext from "../app/contexts/UserContext";
import userStore from "../../src/stores/UserStore";

const icons = [
  "account",
  "account-box",
  "account-circle",
  "account-heart",
  "account-multiple",
  "account-star",
  "account-supervisor",
  "alien",
  "face-agent",
  "face-man",
];

export default function UpdateProfileScreen({ navigation, route }) {
  const { profile } = route.params;
  const [username, setUsername] = useState(profile.username || "");
  const [icon, setIcon] = useState(profile.icon || "");
  const [showModal, setShowModal] = useState(false);

  const handleIconPress = () => {
    setShowModal(true);
  };

  const handleIconSelect = (selectedIcon) => {
    setIcon(selectedIcon);
    setShowModal(false);
  };

  const handleUpdateProfile = (username, icon) => {
    userStore.setProfile({
      ...profile,
      username,
      icon,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Icon name={icon || profile.icon} size={100} style={styles.avatar} />
        <TouchableOpacity onPress={handleIconPress}>
          <Text style={styles.changeIcon}>Change icon</Text>
        </TouchableOpacity>
        <Text style={styles.username}>{profile.username}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={(value) => setUsername(value)}
      />
      <Modal isVisible={showModal}>
        <View style={styles.modalContainer}>
          {icons.map((iconName) => (
            <TouchableOpacity
              key={iconName}
              onPress={() => handleIconSelect(iconName)}
            >
              <Icon name={iconName} size={50} style={styles.modalIcon} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Text style={styles.modalClose}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Button
        onPress={() => {
          handleUpdateProfile(username, icon);
          navigation.goBack();
        }}
        style={styles.button}
      >
        Save Changes
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  changeIcon: {
    color: "#007aff",
    fontSize: 18,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  modalIcon: {
    margin: 5,
    color: "#007aff",
  },
  button: {
    width: "100%",
    backgroundColor: "#007aff",
    borderRadius: 5,
    paddingVertical: 10,
  },
});
