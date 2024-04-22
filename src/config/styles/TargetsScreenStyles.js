import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  content: {
    flex: 1,
    backgroundColor: colors.navy,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  targetWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  buttonContainer: {
    alignItems: "center",
  },
  filterContainer: {
    backgroundColor: colors.brightblue,
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
    width: 100,
  },
  filterButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: colors.brightblue,
    textAlign: "center",
  },
});

export default styles;
