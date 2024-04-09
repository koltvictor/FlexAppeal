import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../config/styles/LoginStyles.js";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import colors from "../config/colors.js";
import { useLogin } from "../app/hooks/useLoginHooks.js";
import { TextInputField } from "../components/InputFieldLogin.js";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  let navigation = useNavigation();
  const [passwordShown, setPasswordShown] = useState(false);

  const { handleLogin, loading, error } = useLogin();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.topSection}>
            <Text style={styles.title}>Welcome back!</Text>
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
          <TextInputField
            iconName="mail-outline"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            secure={false}
          />
          <TextInputField
            iconName="lock-closed-outline"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secure={!passwordShown}
          />
          <TouchableOpacity
            style={styles.inputIcon}
            onPress={togglePasswordVisibility}
          >
            <Ionicons
              name={passwordShown ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLogin(email, password)}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>Don't have an account? Sign up here</Text>
          </TouchableOpacity>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={toggleRememberMe}
            >
              <View
                style={rememberMe ? styles.checkedBox : styles.uncheckedBox}
              >
                {rememberMe && (
                  <Ionicons name="checkmark" size={24} color={colors.black} />
                )}
              </View>
              <Text style={styles.label}>Remember me</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LoginScreen;
