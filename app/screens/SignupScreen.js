import React, { useRef } from "react";
import { useNavigate } from "react-router-native";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Form, FormItem, Modal } from "react-native-form-component";
import {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
} from "/Users/kolt/Development/FlexAppeal/DoneWithIt/firebase/index.js";
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

  const addUser = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Form style={styles.form} onButtonPress={addUser}>
          <FormItem
            style={styles.formInput}
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
            // errorBorderColor="black"
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
    alignItems: "left",
    justifyContent: "center",
    // marginTop: "50%",
    padding: 50,
  },
  form: {
    width: "100%",
  },
  formInput: {
    border: "1px solid black !important",
    fontSize: 36,
  },
});
