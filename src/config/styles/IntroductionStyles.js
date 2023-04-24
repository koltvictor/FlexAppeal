import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
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
  buttonContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 50,
    width: "100%",
    marginBottom: 50,
  },
  button: {
    backgroundColor: colors.brightblue,
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  introImage: {
    width: "100%",
    height: "95%",
    marginTop: 50,
  },
});

export default styles;
