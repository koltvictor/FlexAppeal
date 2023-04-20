import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: "white",
  },
  exerciseList: {
    flex: 1,
  },
  exerciseListContent: {
    paddingBottom: 16,
  },
  exerciseContainer: {
    backgroundColor: "black",
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default styles;
