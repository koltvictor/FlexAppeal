import { View } from "react-native";
import styles from "../config/styles/SignupStyles.js";
import Signup from "../components/Signup.jsx";

const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <Signup />
    </View>
  );
};

export default SignupScreen;
