import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    margin: 20,
    justifyContent: "center",
    flex: 1,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  filterList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterItem: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    margin: 5,
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
    alignItems: "center",
    fontSize: 18,
    color: colors.white,
    fontWeight: "bold",
  },
});

export default styles;
