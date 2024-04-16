import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.navy,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    padding: 15,
  },
  title: {
    color: colors.black,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.brightblue,
  },
  exerciseName: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    textAlign: "center",
    alignItems: "center",
    fontSize: 18,
    color: colors.white,
    fontWeight: "bold",
  },
  noFaves: {
    color: "yellow",
    fontSize: 18,
    textAlign: "center",
  },
  deleteButton: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "red",
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;