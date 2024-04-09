import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../config/styles/LoginStyles";
import colors from "../config/colors";

export const TextInputField = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  secure,
}) => {
  return (
    <View style={[styles.inputContainer]}>
      <View style={styles.inputIcon}>
        <Ionicons
          name={iconName}
          size={24}
          color={colors.white}
          style={styles.inputIcon}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        secureTextEntry={secure}
      />
    </View>
  );
};
