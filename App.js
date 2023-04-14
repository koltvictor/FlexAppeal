// import React, { useEffect, useState } from "react";
// import WelcomeScreen from "./src/screens/WelcomeScreen";
// import LoginScreen from "./src/screens/LoginScreen";
// import SignupScreen from "./src/screens/SignupScreen";
// import DashboardScreen from "./src/screens/DashboardScreen";
// import ExercisesScreen from "./src/screens/ExercisesScreen";
// import ExerciseDetailsScreen from "./src/screens/ExerciseDetailsScreen";
// import ProfileScreen from "./src/screens/ProfileScreen";
// import { db, collection, getDocs } from "./firebase/index";
// import TargetsScreen from "./src/screens/TargetsScreen";
// import GroupsScreen from "./src/screens/GroupsScreen";
// import SplashScreen from "./src/app/SplashScreen";
// import { Provider } from "./src/app/Provider";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";

// import Routes from "./src/app/routes/Routes.js";
// import { useQuery } from "@tanstack/react-query";

// const Stack = createStackNavigator();

// export default function App() {
//   const [currentUser, setCurrentUser] = useState([]);
//   const [targets, setTargets] = useState([]);
//   const [search, setSearch] = useState("");
//   const [clicked, setClicked] = useState(true);

//   // API fetch

//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "9074bf701emsh2b8696dac91ac18p161ae0jsn7153acb84d2d",
//       "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
//     },
//   };

//   const fetchExercsises = async () => {
//     const response = await fetch(
//       "https://exercisedb.p.rapidapi.com/exercises",
//       options
//     );
//     return response.json();
//   };

//   const { data, status } = useQuery("exercises", fetchExercsises);

//   if (status === "loading") return <SplashScreen />;
//   if (status === "error") return <div>Error fetching data</div>;

//   console.log(data);

//   const filteredExercises = data.filter(
//     (exercise) =>
//       exercise.name.toLowerCase().includes(search.toLowerCase()) ||
//       exercise.bodyPart.toLowerCase().includes(search.toLowerCase()) ||
//       exercise.equipment.toLowerCase().includes(search.toLowerCase()) ||
//       exercise.target.toLowerCase().includes(search.toLowerCase())
//   );

//   // Firebase fetch

//   // const getUser = async (uid) => {
//   //   const querySnapshot = await getDocs(collection(db, "users", uid));
//   //   querySnapshot.forEach((doc) => {
//   //     setCurrentUser({
//   //       ...doc.data(),
//   //       id: doc.id,
//   //     });
//   //   });
//   // };

//   // useEffect(() => {
//   //   getUser();
//   // }, [setCurrentUser]);

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
//     <Provider>
//       <SplashScreen>
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="Welcome">
//             <Stack.Screen name="Welcome" component={WelcomeScreen} />
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Sign Up" component={SignupScreen} />

//             <Stack.Screen name="Dashboard" component={DashboardScreen} />
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
//           </Stack.Navigator>
//         </NavigationContainer>
//       </SplashScreen>
//     </Provider>
//   );
// }

// // const getUser = async () => {
// //   const querySnapshot = await getDocs(collection(db, "users"));
// //   querySnapshot.forEach((doc) => {
// //     setUser({
// //       ...doc.data(),
// //       id: doc.id,
// //     });
// //     console.log(user.firstName);
// //   });
// // };

// // useEffect(() => {
// //   getUser();
// // }, [setUser]);

// import React, { useEffect, useState } from "react";
// import WelcomeScreen from "./src/screens/WelcomeScreen";
// import LoginScreen from "./src/screens/LoginScreen";
// import SignupScreen from "./src/screens/SignupScreen";
// import DashboardScreen from "./src/screens/DashboardScreen";
// import ExercisesScreen from "./src/screens/ExercisesScreen";
// import ExerciseDetailsScreen from "./src/screens/ExerciseDetailsScreen";
// import ProfileScreen from "./src/screens/ProfileScreen";
// import TargetsScreen from "./src/screens/TargetsScreen";
// import GroupsScreen from "./src/screens/GroupsScreen";
// import SplashScreen from "./src/app/SplashScreen";
// import { Provider } from "./src/app/Provider";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import Routes from "./src/app/routes/Routes.js";
// import { useQueryClient, useQuery } from "react-query";
// import * as api from "./src/app/api";

// const Stack = createStackNavigator();

// export default function App() {
//   const [search, setSearch] = useState("");
//   const [clicked, setClicked] = useState(true);

//   const queryClient = useQueryClient();
//   const { data: exercises, status: exerciseStatus } = useQuery(
//     "exercises",
//     api.fetchExercises,
//     {
//       onSuccess: (data) => {
//         queryClient.setQueryData("exercises", data);
//       },
//     }
//   );
//   const { data: targets, status: targetStatus } = useQuery(
//     "targets",
//     api.fetchTargets,
//     {
//       onSuccess: (data) => {
//         queryClient.setQueryData("targets", data);
//       },
//     }
//   );

//   const filteredExercises = exercises?.filter(
//     (exercise) =>
//       exercise.name.toLowerCase().includes(search.toLowerCase()) ||
//       exercise.bodyPart.toLowerCase().includes(search.toLowerCase()) ||
//       exercise.equipment.toLowerCase().includes(search.toLowerCase()) ||
//       exercise.target.toLowerCase().includes(search.toLowerCase())
//   );

//   if (exerciseStatus === "loading" || targetStatus === "loading")
//     return <SplashScreen />;
//   if (exerciseStatus === "error" || targetStatus === "error")
//     return <div>Error fetching data</div>;

//   return (
//     <Provider>
//       <SplashScreen>
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="Welcome">
//             <Stack.Screen name="Welcome" component={WelcomeScreen} />
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Sign Up" component={SignupScreen} />

//             <Stack.Screen name="Dashboard" component={DashboardScreen} />
//             <Stack.Screen
//               name="Targets"
//               component={TargetsScreen}
//               initialParams={{ targets }}
//             />
//             <Stack.Screen
//               name="Index"
//               component={ExercisesScreen}
//               initialParams={{
//                 filteredExercises,
//                 search,
//                 setSearch,
//                 clicked,
//                 setClicked,
//               }}
//             />
//             <Stack.Screen
//               name="Exercise/:id"
//               component={ExerciseDetailsScreen}
//             />
//             <Stack.Screen name="Profile" component={ProfileScreen} />
//             <Stack.Screen name="/:target" component={GroupsScreen} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </SplashScreen>
//     </Provider>
//   );
// }
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./firebase";
import SplashScreen from "./src/app/SplashScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import ExercisesScreen from "./src/screens/ExercisesScreen";
import ExerciseDetailsScreen from "./src/screens/ExerciseDetailsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "react-query";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen
              name="Exercises"
              component={ExercisesScreen}
              options={({ route }) => ({
                title: "Exercises",
                headerShown: false,
                exercises: route.params?.exercises || [],
                search,
                setSearch,
                clicked,
                setClicked,
              })}
            />
            <Stack.Screen
              name="ExerciseDetails"
              component={ExerciseDetailsScreen}
            />
            {/* <Stack.Screen
            name="FavouriteRoutines"
            component={FavouriteRoutinesScreen}
          /> */}
            {/* <Stack.Screen name="AllRoutines" component={AllRoutinesScreen} /> */}
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </FirebaseAppProvider>
  );
}
