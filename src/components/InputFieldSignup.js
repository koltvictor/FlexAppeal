import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../config/styles/SignupStyles.js";
import colors from "../config/colors.js";

export const InputField = ({
  iconName,
  placeholder,
  secure,
  onChangeText,
  value,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Ionicons
        name={iconName}
        size={24}
        color={colors.navy}
        style={styles.inputIcon}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.slate}
        placeholder={placeholder}
        secureTextEntry={secure}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};
