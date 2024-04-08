import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
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

  return (
    <View>
      <View style={styles.topSection}>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.subTitle}>Create your account</Text>
      </View>
      <InputField
        iconName="person-outline"
        placeholder="Username"
        secure={false}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <InputField
        iconName="mail-outline"
        placeholder="Email"
        secure={false}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <InputField
        iconName="lock-closed-outline"
        placeholder="Password"
        secure={!passwordShown}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <InputField
        iconName="lock-closed-outline"
        placeholder="Confirm Password"
        secure={!passwordShown}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />
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
