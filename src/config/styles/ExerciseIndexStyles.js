import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkgrey,
    padding: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.sandy,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: "white",
  },
  exerciseList: {
    flex: 1,
  },
  exerciseListContent: {
    paddingBottom: 16,
  },
  exerciseContainer: {
    backgroundColor: colors.navy,
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  inputContainer: {
    position: "relative",
  },
  clearButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});

export default styles;
