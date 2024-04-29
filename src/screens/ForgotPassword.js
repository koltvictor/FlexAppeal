import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import commonStyles from "../config/styles/CommonStyles";
import { InputField } from "../components/InputFieldSignup";
import { auth, sendPasswordResetEmail } from "../app/firebase";
import Toast from "react-native-toast-message";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const firebaseErrorMessages = {
    "auth/user-not-found": "Email not found",
    "auth/invalid-email": "Invalid email",
    "auth/too-many-requests": "Too many requests, try again later",
  };

  const handlePasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Toast.show({
        type: "success",
        position: "top",
        topOffset: 100,
        text1: "Success",
        text1Style: { fontSize: 18, color: "green", textAlign: "center" },
        text2: "Password reset email sent",
        text2Style: { fontSize: 14, textAlign: "center" },
        visibilityTime: 4000,
        autoHide: true,
        swipeable: true,
      });
    } catch (error) {
      console.log(error.code, error.message);
      const customMessage = firebaseErrorMessages[error.code];

      Toast.show({
        type: "error",
        position: "top",
        topOffset: 100,
        text1: "Hoppla!",
        text1Style: { fontSize: 18, color: "red", textAlign: "center" },
        text2: customMessage,
        text2Style: { fontSize: 10, textAlign: "center" },
        visibilityTime: 4000,
        autoHide: true,
        swipeable: true,
      });
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.centerCenter}>
        <Text style={commonStyles.text}>Forgot Password?</Text>
        <InputField
          iconName="mail"
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          secure={false}
          autoComplete={true}
        />
        <TouchableOpacity
          onPress={() => handlePasswordReset(email)}
          style={commonStyles.primaryButton}
        >
          <Text style={commonStyles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
