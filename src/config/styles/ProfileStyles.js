import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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
    color: "#FFFFFF",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 50,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#00c9ff",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  updateButton: {},
  logoutButton: {
    backgroundColor: "#FF4500",
  },
});

export default styles;
