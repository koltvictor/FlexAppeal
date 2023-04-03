import React from "react";
import { useNavigate } from "react-router-native";
import { Button, SafeAreaView, TextInput } from "react-native";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  return (
    <SafeAreaView>
      <TextInput
        placeholder="email address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="back" onPress={() => navigate("/")} />
      <Button title="login" onPress={() => navigate("/dashboard")} />
    </SafeAreaView>
  );
}
