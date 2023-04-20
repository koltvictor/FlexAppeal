import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  setsRepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  repsContainer: {
    flex: 1,
    marginRight: 10,
  },
  repsInput: {
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    backgroundColor: "#FFFFFF",
  },
  pickerItem: {
    fontSize: 16,
  },
  timeContainer: {
    flex: 1,
  },
  timeInput: {
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    backgroundColor: "#FFFFFF",
  },
});

export default styles;
