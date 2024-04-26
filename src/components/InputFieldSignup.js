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
      <View style={styles.inputIcon}>
        <Ionicons
          name={iconName}
          size={24}
          color={colors.lightgrey}
          style={styles.inputIcon}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.slate}
        color={colors.white}
        placeholder={placeholder}
        secureTextEntry={secure}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};
