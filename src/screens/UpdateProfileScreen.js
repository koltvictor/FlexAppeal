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
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={handleIconPress}
        >
          <Icon name={icon} size={100} color="#FFA500" />
        </TouchableOpacity>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Button onPress={handleSaveChanges} title="Save Changes" />
      </View>
      <Modal isVisible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.iconGrid}>
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
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    marginHorizontal: 30,
    marginVertical: 40,
  },
  label: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#ffffff",
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: "center",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    height: 80,
    width: 80,
    marginBottom: 20,
    alignSelf: "center",
  },
  icon: {
    alignSelf: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 20,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconOption: {
    width: 50,
    height: 50,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  iconOptionSelected: {
    backgroundColor: "#00c9ff",
    borderRadius: 5,
  },
  iconOptionUnselected: {
    backgroundColor: "#ffffff",
  },
  iconOptionCheckmark: {
    color: "#ffffff",
    fontSize: 20,
  },
  changeIconButton: {
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  changeButtonText: {
    color: "#555",
    fontSize: 16,
  },
});
