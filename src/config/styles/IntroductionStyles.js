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
    bottom: 90,
    width: "80%",
    backgroundColor: "orange",
    borderRadius: 5,
    padding: 10,
    boxShadow: "0 10px 10px 0 rgba(255,255,255,0.8)",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
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
