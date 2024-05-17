import { useState } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import PropTypes from "prop-types";

export default function ImagePickerExample({ onImageSelected }) {
  // Receive onImageSelected as a parameter
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageSelected(result); // Call directly
    }
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </View>
  );
}

ImagePickerExample.propTypes = {
  onImageSelected: PropTypes.func.isRequired, // Define prop type
};
