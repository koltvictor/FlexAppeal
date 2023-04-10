import React, { useRef } from "react";
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
import { Form, FormItem } from "react-native-form-component";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const firstNameInput = useRef();
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
        </Form>
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
