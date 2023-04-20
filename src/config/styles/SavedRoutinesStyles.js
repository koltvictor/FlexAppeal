import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  header: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
    fontFamily: "Helvetica",
  },
  routineContainer: {
    backgroundColor: "#333333",
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  routineName: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
    fontFamily: "Helvetica",
  },
});

export default styles;
