import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.navy,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    padding: 15,
  },
  title: {
    color: colors.black,
    fontSize: 24,
    textAlign: "center",
    margin: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  gifContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    shadowColor: colors.lightgrey,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  gif: {
    width: 300,
    height: 300,
    borderRadius: 5,
  },
  instructions: {
    fontSize: 20,
    padding: 20,
  },
});

export default styles;
