import { StyleSheet } from "react-native";
import colors from "../colors";

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkgrey,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "bold",
  },
  primaryButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.brightblue,
  },
  secondaryButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.sandy,
  },
  textButton: {
    color: colors.linkblue,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    textDecorationLine: "underline",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    color: colors.white,
  },
  titleText: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 10,
  },
  subheaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.lightgrey,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 10,
  },
  textInput: {
    width: 200,
    height: 40,
    borderRadius: 20,
    borderColor: colors.slate,
    borderWidth: 1,
    padding: 10,
    color: colors.white,
    margin: 10,
    marginBottom: 20,
  },
});

export default commonStyles;
