import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.sandy,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.white,
  },
  setsRepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  repsContainer: {
    flex: 1,
    marginRight: 10,
  },
  repsInput: {
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    backgroundColor: colors.white,
  },
  pickerItem: {
    fontSize: 16,
  },
  timeContainer: {
    flex: 1,
  },
  timeInput: {
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    backgroundColor: colors.white,
  },
});

export default styles;
