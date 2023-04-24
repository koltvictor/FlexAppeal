import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import UserContext from "../app/contexts/UserContext";
import styles from "../config/styles/UpdateProfileStyles";
import icons from "../assets/icons";
import colors from "../config/colors";

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
          <Icon name={icon} size={100} color={colors.brightblue} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleIconPress}
          style={styles.changeIconContainer}
        >
          <Text style={styles.changeIconText}>Change Icon</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TouchableOpacity onPress={handleSaveChanges} style={styles.button}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={showModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowModal(false)}
          >
            <Icon name="close" size={30} color="#555" />
          </TouchableOpacity>

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
