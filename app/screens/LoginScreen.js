import React from "react";
import { useNavigate } from "react-router-native";
import Icon from "react-native-ico-material-design";
import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          placeholder="email address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="password"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <Button title="back" onPress={() => navigate("/")} />
      <Button title="login" onPress={() => navigate("/dashboard")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50%",
  },
});
