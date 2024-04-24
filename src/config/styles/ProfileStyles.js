import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    marginBottom: 20,
  },
  routineContainer: {
    backgroundColor: colors.slate,
    borderRadius: 10,
    marginBottom: 30,
    padding: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
