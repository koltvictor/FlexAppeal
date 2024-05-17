import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  centerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
