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
    color: colors.white,
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
  buttonContainer: {
    padding: 25,
  },
  exerciseName: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    textAlign: "center",
    alignItems: "center",
    fontSize: 18,
    color: colors.darkgrey,
    fontWeight: "bold",
  },
  noFaves: {
    color: "yellow",
    fontSize: 18,
    textAlign: "center",
  },
  indivContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  removeIcon: {
    color: colors.red,
    fontSize: 24,
    padding: 10,
  },
});

export default styles;
