import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  iconContainer: {
    marginBottom: 20,
  },
  modalContainer: {
    backgroundColor: colors.darkgrey,
    padding: 40,
    borderRadius: 10,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  iconOption: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.lightgrey,
  },
  selectedIcon: {
    backgroundColor: colors.brightblue,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default styles;
