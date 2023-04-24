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
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    color: colors.lightgrey,
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
    backgroundColor: colors.softblue,
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
    color: colors.brightblue,
    fontSize: 16,
    marginTop: 30,
    textAlign: "center",
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
    borderColor: colors.softblue,
    marginRight: 10,
  },
  checkedBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: colors.sandy,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  label: {
    color: colors.sandy,
    fontSize: 16,
  },
});

export default styles;
