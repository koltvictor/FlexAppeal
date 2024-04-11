import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 50,
    justifyContent: "center",
    flex: 1,
  },
  title: {
    color: "black",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  filterList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterText: {
    color: "black",
    fontSize: 16,
  },
  filterItem: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    margin: 5,
  },
  buttonCancel: {
    borderRadius: 25,
    alignItems: "center",
    padding: 15,
    backgroundColor: "red",
    margin: 10,
  },
  buttonApply: {
    borderRadius: 25,
    alignItems: "center",
    padding: 15,
    backgroundColor: "green",
    margin: 10,
  },
  buttonClear: {
    borderRadius: 25,
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.brightblue,
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
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
