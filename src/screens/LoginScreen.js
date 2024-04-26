import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../config/styles/LoginStyles.js";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors.js";
import commonStyles from "../config/styles/CommonStyles.js";
import { useLogin } from "../app/hooks/useLoginHooks.js";
import { TextInputField } from "../components/InputFieldLogin.js";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  let navigation = useNavigation();
  const [passwordShown, setPasswordShown] = useState(false);

  const { handleLogin, loading } = useLogin();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <View style={commonStyles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.topSection}>
            <Text style={styles.title}>Welcome back!</Text>
          </View>
          <TextInputField
            iconName="mail-outline"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            secure={false}
            autoComplete={true}
          />
          <TextInputField
            iconName="lock-closed-outline"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secure={!passwordShown}
          />
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
            onPress={() => handleLogin(email, password, rememberMe)}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={commonStyles.link}>
              Don't have an account? Sign up here
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={commonStyles.textButton}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LoginScreen;
