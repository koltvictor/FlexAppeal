import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../config/styles/SignupStyles.js";
import colors from "../config/colors.js";
import { useSignup } from "../app/hooks/useSignupHooks.js";
import { InputField } from "./InputFieldSignup.js";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const navigation = useNavigation();

  const initialIcon = ["skull"];

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSignup = useSignup();

  const inputFieldsConfig = [
    {
      iconName: "person-outline",
      placeholder: "Username",
      secure: false,
      stateUpdater: setUsername,
      stateValue: username,
    },
    {
      iconName: "mail-outline",
      placeholder: "Email",
      secure: false,
      stateUpdater: setEmail,
      stateValue: email,
    },
    {
      iconName: "lock-closed-outline",
      placeholder: "Password",
      secure: !passwordShown,
      stateUpdater: setPassword,
      stateValue: password,
    },
    {
      iconName: "lock-closed-outline",
      placeholder: "Confirm Password",
      secure: !passwordShown,
      stateUpdater: setConfirmPassword,
      stateValue: confirmPassword,
    },
  ];

  return (
    <View>
      <View style={styles.topSection}>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.subTitle}>Create your account</Text>
      </View>
      {inputFieldsConfig.map((inputFieldConfig, index) => (
        <InputField
          key={index}
          iconName={inputFieldConfig.iconName}
          placeholder={inputFieldConfig.placeholder}
          secure={inputFieldConfig.secure}
          onChangeText={(text) => inputFieldConfig.stateUpdater(text)}
          value={inputFieldConfig.stateValue}
        />
      ))}
      <TouchableOpacity
        style={styles.passwordIcon}
        onPress={togglePasswordVisibility}
      >
        <Ionicons
          name={passwordShown ? "eye-outline" : "eye-off-outline"}
          size={24}
          color={colors.brightblue}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          handleSignup(
            username,
            email.toLowerCase(),
            password,
            confirmPassword,
            initialIcon,
            navigation
          )
        }
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
