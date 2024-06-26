import { StyleSheet } from "react-native";
import colors from "../colors";

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkgrey,
  },
  centerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
    textAlign: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.sandy,
    marginBottom: 16,
    textAlign: "center",
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
  link: {
    color: colors.white,
    fontSize: 16,
    marginTop: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default commonStyles;
