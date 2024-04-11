import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  targetItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: colors.slate,
    borderBottomWidth: 1,
  },
  targetText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "bold",
    marginLeft: 20,
    paddingBottom: 8,
  },
});

export default styles;
