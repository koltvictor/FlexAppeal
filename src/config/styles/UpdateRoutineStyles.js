import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  routineName: {
    fontSize: 20,
    padding: 10,
    color: "#FFFFFF",
  },
  exerciseContainer: {
    marginBottom: 20,
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  exerciseName: {
    fontSize: 18,
    color: "#FFFFFF",
    padding: 10,
  },
  inputContainer: {
    backgroundColor: "#000",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
    color: "white",
  },
  contentContainer: {
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    justifyContent: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "white",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#2980b9",
    marginRight: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
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
  updateButton: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  saveButton: {
    position: "absolute",
    bottom: 1,
    right: 20,
    padding: 10,
  },
});

export default styles;
