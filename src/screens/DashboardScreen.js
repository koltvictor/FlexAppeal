import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./ProfileScreen";
import ExercisesScreen from "./ExercisesScreen";

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});

export default function DashboardScreen() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TouchableOpacity
              style={styles.icon}
              onPress={() => navigation.navigate("UpdateProfile")}
            >
              <Ionicons name="person" size={size} color={color} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Exercises"
        component={ExercisesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TouchableOpacity
              style={styles.icon}
              onPress={() => navigation.navigate("AllExercises")}
            >
              <Ionicons name="barbell" size={size} color={color} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// define UserProfileScreen component
// const UserProfileScreen = () => {
//   const navigation = useNavigation();
//   const { data: user } = useFirestore().useUser();
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>{user?.displayName}</Text>
//       <Text>{user?.email}</Text>
//       <TouchableOpacity onPress={() => navigation.navigate("UpdateProfile")}>
//         <Text>Edit Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// define AllExercisesScreen component
// const AllExercisesScreen = () => {
//   const { data: exercises } = useQuery("exercises", async () => {
//     const response = await fetch(
//       "https://exercisedb.p.rapidapi.com/exercises",
//       {
//         headers: {
//           "X-RapidAPI-Key":
//             "9074bf701emsh2b8696dac91ac18p161ae0jsn7153acb84d2d",
//           "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
//         },
//       }
//     );
//     return response.json();
//   });
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       {exercises?.map((exercise) => (
//         <Text key={exercise.id}>{exercise.name}</Text>
//       ))}
//     </View>
//   );
// };

// define AllRoutinesScreen component
// const AllRoutinesScreen = () => {
//   const { data: routines } = useFirestoreCollectionData(
//     useFirestore().collection("routines"),
//     { idField: "id" }
//   );
//   const navigation = useNavigation();
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate("FilteredRoutines", { isFavorite: true })
//         }
//       >
//         <Text>Favorite Routines</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate("FilteredRoutines", { isFavorite: false })
//         }
//       >
//         <Text>All Routines</Text>
//       </TouchableOpacity>
//       {routines?.map((routine) => (
//         <Text key={routine.id}>{routine.name}</Text>
//       ))}
//     </View>
//   );
// };
