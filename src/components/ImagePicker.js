import { useState } from "react";
import { Button, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import PropTypes from "prop-types";

export default function ImagePickerExample({ onImageSelected }) {
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
      onImageSelected(result);
    }
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </View>
  );
}

ImagePickerExample.propTypes = {
  onImageSelected: PropTypes.func.isRequired,
};
