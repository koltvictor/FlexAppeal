import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../config/styles/SignupStyles.js";
import colors from "../config/colors.js";
import { useSignup } from "../app/hooks/useSignupHooks.js";

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
      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={24}
          color={colors.navy}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.slate}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={24}
          color={colors.navy}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.slate}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={24}
          color={colors.navy}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.slate}
          placeholder="Password"
          secureTextEntry={!passwordShown}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.inputIcon}
          onPress={togglePasswordVisibility}
        >
          <Ionicons
            name={passwordShown ? "eye-outline" : "eye-off-outline"}
            size={24}
            color={colors.brightblue}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={24}
          color={colors.navy}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.slate}
          placeholder="Confirm password"
          secureTextEntry={!passwordShown}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
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
