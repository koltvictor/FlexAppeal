import React, { useRef } from "react";
import { useNavigate } from "react-router-native";
import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth } from "../../firebase/index.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ setIsSignedIn, isSignedIn }) {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const SignInUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsSignedIn(true);
        const user = userCredential.user;
        console.log(user.email);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button title="back" onPress={() => navigate("/")} />
      <Button title="login" onPress={SignInUser} />
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
