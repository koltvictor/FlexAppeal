import { View } from "react-native";
import commonStyles from "../config/styles/CommonStyles.js";
import Signup from "../components/Signup.jsx";

const SignupScreen = () => {
  return (
    <View style={commonStyles.container}>
      <Signup />
    </View>
  );
};

export default SignupScreen;
