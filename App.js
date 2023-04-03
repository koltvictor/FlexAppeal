import WelcomeScreen from "./app/screens/WelcomeScreen";
import { NativeRouter, Routes, Route } from "react-router-native";
import LoginScreen from "./app/screens/LoginScreen";

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route exact path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </NativeRouter>
  );
}
