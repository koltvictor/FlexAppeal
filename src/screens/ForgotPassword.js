import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import commonStyles from "../config/styles/CommonStyles";
import { TextInputField } from "../components/InputFieldLogin";
import { auth, sendPasswordResetEmail } from "../app/firebase/index";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully");
    } catch (error) {
      console.log("Error sending password reset email", error);
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.centerCenter}>
        <Text style={commonStyles.text}>Forgot Password?</Text>
        <TextInputField
          iconName="mail"
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          secure={false}
          autoComplete={true}
        />
        <TouchableOpacity
          onPress={handlePasswordReset}
          style={commonStyles.primaryButton}
        >
          <Text style={commonStyles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
