import WelcomeScreen from "./app/screens/WelcomeScreen";
import { NativeRouter, Routes, Route } from "react-router-native";
import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import DashboardScreen from "./app/screens/DashboardScreen";
import ExercisesScreen from "./app/screens/ExercisesScreen";

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route exact path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/index" element={<ExercisesScreen />} />
      </Routes>
    </NativeRouter>
  );
}
