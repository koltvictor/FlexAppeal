import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: 20,
  },
  topSection: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  title: {
    color: colors.palegreen,
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
    borderBottomColor: colors.slate,
    width: "100%",
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: 18,
    marginLeft: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputIconImage: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: colors.brightblue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    color: colors.white,
    fontSize: 16,
    marginTop: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  error: {
    color: colors.red,
    fontSize: 20,
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
  },
  uncheckedBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.slate,
    marginRight: 10,
  },
  checkedBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  label: {
    color: colors.white,
    fontSize: 16,
  },
  forgotContainer: {
    padding: 20,
    alignItems: "center",
  },
  passViewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eyeIcon: {
    position: "absolute",
    right: 0,
    bottom: 30,
  },
});

export default styles;
