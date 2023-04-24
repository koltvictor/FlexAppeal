import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  avatar: {
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: colors.softblue,
    marginBottom: 50,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.brightblue,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  logoutButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.sandy,
  },
});

export default styles;
