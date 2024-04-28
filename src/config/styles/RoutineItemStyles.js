import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.sandy,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
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
  pickerItemStyle: {
    height: 100,
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
  closeIcon: {
    position: "relative",
    padding: 10,
  },
  active: {
    backgroundColor: "lightblue",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: colors.white,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
});

export default styles;
