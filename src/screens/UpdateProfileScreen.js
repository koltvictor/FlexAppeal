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

  const { handleUpdateProfile } = useContext(UserContext);

  const handleIconPress = () => {
    setShowModal(true);
  };

  const handleIconSelect = (selectedIcon) => {
    setIcon(selectedIcon);
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    handleUpdateProfile(username, icon)
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        console.log("Error updating profile:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Text style={styles.label}>Icon:</Text>
        <TouchableOpacity style={styles.iconButton} onPress={handleIconPress}>
          <Icon name={icon} size={30} color="#555" />
          <Icon name="chevron-down" size={30} color="#555" />
        </TouchableOpacity>
        <Button onPress={handleSaveChanges} title="Save Changes" />
      </View>
      <Modal isVisible={showModal}>
        <View style={styles.modalContainer}>
          {icons.map((iconName) => (
            <TouchableOpacity
              key={iconName}
              style={[
                styles.iconOption,
                iconName === icon ? styles.selectedIcon : null,
              ]}
              onPress={() => handleIconSelect(iconName)}
            >
              <Icon name={iconName} size={30} color="#555" />
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
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
