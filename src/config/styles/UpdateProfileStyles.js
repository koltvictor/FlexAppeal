import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  changeIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  changeIconText: {
    color: colors.lightgrey,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  formContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  iconContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderRadius: 20,
    borderColor: colors.slate,
    borderWidth: 1,
    padding: 10,
    color: colors.white,
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.brightblue,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: colors.softblue,
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
});

export default styles;
