import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
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
    marginBottom: 30,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    color: "#7C7C7C",
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
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
    backgroundColor: "#1ED760",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    color: "#1ED760",
    fontSize: 16,
    marginTop: 30,
  },
  error: {
    color: "#FF0000",
    fontSize: 20,
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  uncheckedBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    marginRight: 10,
  },
  checkedBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default styles;
