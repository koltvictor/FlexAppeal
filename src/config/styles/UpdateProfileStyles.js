import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    // marginTop: 50,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default styles;
