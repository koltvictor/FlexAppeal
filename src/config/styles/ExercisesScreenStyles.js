import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  targetItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: "#444",
    borderBottomWidth: 1,
  },
  targetText: {
    fontSize: 20,
    color: "#fff",
    marginLeft: 20,
  },
});

export default styles;
