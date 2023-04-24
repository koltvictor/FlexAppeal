import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  tabIcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: colors.navy,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 5,
    alignSelf: "center", // align the text to the center of the tab
  },
});

export default styles;
