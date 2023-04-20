import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 16,
    marginTop: 30,
  },
});

export default styles;
