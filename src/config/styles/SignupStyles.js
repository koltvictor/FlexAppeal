import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palegreen,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  topSection: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  title: {
    color: colors.navy,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    color: colors.slate,
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgrey,
  },
  input: {
    flex: 1,
    color: colors.black,
    fontSize: 18,
    marginLeft: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: colors.navy,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    fontSize: 16,
    marginTop: 30,
  },
  linkText: {
    color: colors.softblue,
    fontSize: 16,
    marginTop: 30,
    fontWeight: "bold",
  },
});

export default styles;
