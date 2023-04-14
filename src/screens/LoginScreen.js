// import React, { useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import {
//   Button,
//   Pressable,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
import { auth } from "../../firebase/index.js";
import { signInWithEmailAndPassword } from "firebase/auth";

// export default function LoginScreen() {
//   const navigate = useNavigation();
//   const [currentUser, setCurrentUser] = useState();
//   const [isSignedIn, setIsSignedIn] = useState(false);
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [passwordShown, setPasswordShown] = useState(false);

//   const togglePassword = (e) => {
//     e.preventDefault();
//     setPasswordShown(!passwordShown);
//   };

//   const SignInUser = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         setIsSignedIn(true);
//         const user = userCredential.user;
//         setCurrentUser(user);
//         console.log(user.email);
//         navigate.navigate("Dashboard");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="email address"
//           value={email}
//           onChangeText={(text) => setEmail(text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="password"
//           value={password}
//           onChangeText={(text) => setPassword(text)}
//           secureTextEntry={!passwordShown}
//         />
//         <Button title="show password" onPress={togglePassword} />
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={SignInUser}>
//           <Text style={styles.buttonText}>login</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   inputContainer: {
//     width: "80%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   input: {
//     width: "100%",
//     height: 40,
//     margin: 12,
//     backgroundColor: "lightgrey",
//     borderRadius: 5,
//     padding: 10,
//   },
//   buttonContainer: {
//     width: "60%",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 40,
//   },
//   button: {
//     backgroundColor: "lightblue",
//     width: "100%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     borderColor: "black",
//     borderWidth: 1,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: "white",
//     fontWeight: "700",
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let navigation = useNavigation();
  const [passwordShown, setPasswordShown] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  const handleLogin = async () => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsSignedIn(true);
        const user = userCredential.user;
        setCurrentUser(user);
        console.log(user.email);
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // const handleLogin = async () => {
  //   setLoading(true);
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  //   setLoading(false);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText} onPress={handleLogin}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingLeft: 10,
    marginVertical: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#1abc9c",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    color: "#1abc9c",
    textDecorationLine: "underline",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
