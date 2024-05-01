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
    color: colors.white,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  searchButton: {
    color: colors.white,
    backgroundColor: colors.brightblue,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    textAlign: "center",
  },
});

export default styles;
