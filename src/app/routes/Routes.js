// import React, { useEffect, useState } from "react";
// import WelcomeScreen from "../../screens/WelcomeScreen";
// import LoginScreen from "../../screens/LoginScreen";
// import SignupScreen from "../../screens/SignupScreen";
// import DashboardScreen from "../../screens/DashboardScreen";
// import ExercisesScreen from "../../screens/ExercisesScreen";
// import ExerciseDetailsScreen from "../../screens/ExerciseDetailsScreen";
// import ProfileScreen from "../../screens/ProfileScreen";
// import { db, collection, getDocs } from "./firebase/index";
// import TargetsScreen from "../../screens/TargetsScreen";
// import GroupsScreen from "../../screens/GroupsScreen";
// import SplashScreen from "./src/app/SplashScreen";
// import { Provider } from "./src/app/Provider";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";

// const Stack = createStackNavigator();

// export default function Routes() {
//   const [currentUser, setCurrentUser] = useState([]);
//   const [isSignedIn, setIsSignedIn] = useState(false);
//   const [exercises, setExercises] = useState([]);
//   const [targets, setTargets] = useState([]);
//   const [search, setSearch] = useState("");
//   const [clicked, setClicked] = useState(false);
//   const filteredExercises = exercises.filter(
//     (exercise) =>
//       exercise.name.toLowerCase().includes(search.toLowerCase()) ||
//       exercise.bodyPart.toLowerCase().includes(search.toLowerCase()) ||
//       exercise.equipment.toLowerCase().includes(search.toLowerCase()) ||
//       exercise.target.toLowerCase().includes(search.toLowerCase())
//   );

//   // API fetch

//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "9074bf701emsh2b8696dac91ac18p161ae0jsn7153acb84d2d",
//       "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
//     },
//   };

//   useEffect(() => {
//     const getExercsises = async () => {
//       const response = await fetch(
//         "https://exercisedb.p.rapidapi.com/exercises",
//         options
//       );
//       const data = await response.json();
//       setExercises(data);
//     };
//     getExercsises();
//   }, []);

//   // Firebase fetch

//   const getUser = async (uid) => {
//     const querySnapshot = await getDocs(collection(db, "users", uid));
//     querySnapshot.forEach((doc) => {
//       setCurrentUser({
//         ...doc.data(),
//         id: doc.id,
//       });
//     });
//   };

//   useEffect(() => {
//     getUser();
//   }, [setCurrentUser]);

//   // API fetch targets

//   useEffect(() => {
//     const getTargets = async () => {
//       const response = await fetch(
//         "https://exercisedb.p.rapidapi.com/exercises/targetList",
//         options
//       );
//       const data = await response.json();
//       setTargets(data);
//     };
//     getTargets();
//   }, []);

//   // API fetch list by targets

//   return (
//     <NavigationContainer>
//       <Provider>
//         <SplashScreen>
//           <Stack.Navigator initialRouteName="Welcome">
//             {/* <Routes> */}
//             <Stack.Screen name="Welcome" component={WelcomeScreen} />
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen
//               name="Signup"
//               component={SignupScreen}
//               initialParams={{
//                 setIsSignedIn: { setIsSignedIn },
//                 isSignedIn: { isSignedIn },
//               }}
//             />

//             <Stack.Screen
//               name="Dashboard"
//               component={DashboardScreen}
//               initialParams={{
//                 currentUser: { currentUser },
//                 isSignedIn: { isSignedIn },
//                 setIsSignedIn: { setIsSignedIn },
//               }}
//             />
//             <Stack.Screen
//               name="Targets"
//               component={TargetsScreen}
//               initialParams={{ targets: { targets } }}
//             />
//             <Stack.Screen
//               name="Index"
//               component={ExercisesScreen}
//               initialParams={{
//                 filteredExercises: { filteredExercises },

//                 search: { search },
//                 setSearch: { setSearch },
//                 clicked: { clicked },
//                 setClicked: { setClicked },
//               }}
//             />
//             <Stack.Screen
//               name="Exercise/:id"
//               component={ExerciseDetailsScreen}
//             />
//             <Stack.Screen name="Profile" component={ProfileScreen} />
//             <Stack.Screen name="/:target" component={GroupsScreen} />
//             {/* <Route path="/exercise/:id" element={<TargetDetails />} /> */}
//             {/* </Routes> */}
//           </Stack.Navigator>
//         </SplashScreen>
//       </Provider>
//     </NavigationContainer>
//   );
// }
