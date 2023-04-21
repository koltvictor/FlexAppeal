import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  button: {
    position: "absolute",
    bottom: 100,
    width: "70%",
    backgroundColor: "orange",
    borderRadius: 5,
    padding: 25,
  },
  buttonText: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  introImage: {
    width: "100%",
    height: "105%",
    marginTop: 20,
  },
});

export default styles;
