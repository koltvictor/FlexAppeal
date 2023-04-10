import React, { useRef } from "react";
import { useNavigate } from "react-router-native";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Form, FormItem } from "react-native-form-component";

export default function SignupScreen() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Form>
          <FormItem
            label="First Name"
            isRequired
            value={firstName}
            onChangeText={(firstName) => setFirstName(firstName)}
            asterik
            ref={firstNameInput}
          />
          <FormItem
            label="Last Name"
            isRequired
            value={lastName}
            onChangeText={(lastName) => setLastName(lastName)}
            asterik
            ref={lastNameInput}
          />
          <FormItem
            label="Email"
            isRequired
            value={email}
            onChangeText={(email) => setEmail(email)}
            asterik
            ref={emailInput}
          />
          <FormItem
            label="Password"
            isRequired
            value={password}
            onChangeText={(password) => setPassword(password)}
            asterik
            ref={passwordInput}
          />
          <FormItem
            label="Confirm Password"
            isRequired
            value={confirmPassword}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
            asterik
            ref={passwordInput}
          />
        </Form>
      </View>
      <Button title="back to login" onPress={() => navigate("/")} />
      <Button title="register" onPress={() => navigate("/dashboard")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    // marginTop: "50%",
    padding: 50,
  },
});
