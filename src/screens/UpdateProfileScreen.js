import React, { useState, useContext, useCallback } from "react";
import {
  Image,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import ImagePickerExample from "../components/ImagePicker";
import UserContext from "../app/contexts/UserContext";
import commonStyles from "../config/styles/CommonStyles";
import styles from "../config/styles/UpdateProfileStyles";

export default function UpdateProfileScreen({ navigation, route }) {
  const { profile } = route.params;
  const { handleUpdateProfile } = useContext(UserContext);
  const [username, setUsername] = useState(profile.username || "");
  const [icon, setIcon] = useState(profile.icon || "");

  const handleImageSelected = useCallback((result) => {
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setIcon(imageUri); // Set icon state directly with the image URI
    }
  }, []);

  const handleSaveChanges = () => {
    handleUpdateProfile(username, icon) // Pass the updated 'icon' value
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
          <Image source={{ uri: icon }} style={styles.avatar} />
          <ImagePickerExample onImageSelected={handleImageSelected} />
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
    </SafeAreaView>
  );
}
