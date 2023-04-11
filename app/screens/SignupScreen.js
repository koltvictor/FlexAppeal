import React, { useRef } from "react";
import { useNavigate } from "react-router-native";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
} from "/Users/kolt/Development/FlexAppeal/DoneWithIt/firebase/index.js";
import { TextInput } from "react-native-gesture-handler";
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
        <View style={styles.form}>
          <TextInput
            style={styles.formInput}
            placeholder="First Name"
            isRequired
            value={firstName}
            onChangeText={(firstName) => setFirstName(firstName)}
            asterik
            ref={firstNameInput}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Last Name"
            isRequired
            value={lastName}
            onChangeText={(lastName) => setLastName(lastName)}
            asterik
            ref={lastNameInput}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Email"
            isRequired
            value={email}
            onChangeText={(email) => setEmail(email)}
            asterik
            ref={emailInput}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Password"
            isRequired
            value={password}
            onChangeText={(password) => setPassword(password)}
            asterik
            ref={passwordInput}
          />
          <TextInput
            style={styles.formInput}
            // errorBorderColor="black"
            placeholder="Confirm Password"
            isRequired
            value={confirmPassword}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
            asterik
            ref={passwordInput}
          />
          <Button title="register" onPress={addUser} />
        </View>
      </View>
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
