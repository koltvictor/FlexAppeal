import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import UserContext from "../app/contexts/UserContext";
import icons from "../assets/icons";
import commonStyles from "../config/styles/CommonStyles";
import styles from "../config/styles/UpdateProfileStyles";
import colors from "../config/colors";

export default function UpdateProfileScreen({ navigation, route }) {
  const { profile } = route.params;
  const { handleUpdateProfile } = useContext(UserContext);
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
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.centerCenter}>
        <View style={styles.formContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={handleIconPress}
          >
            <Ionicons name={icon} size={100} color={colors.brightblue} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleIconPress}>
            <Text style={commonStyles.textButton}>Edit Icon</Text>
          </TouchableOpacity>
          <View style={styles.rowContainer}>
            <View>
              <Text style={commonStyles.text}>Username:</Text>
            </View>
            <View>
              <TextInput
                style={commonStyles.textInput}
                placeholder="Enter your username"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSaveChanges}
            style={commonStyles.primaryButton}
          >
            <Text style={commonStyles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal isVisible={showModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowModal(false)}
          >
            <Ionicons name="close" size={30} style={commonStyles.closeButton} />
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
                <Ionicons name={iconName} size={30} color="#555" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
