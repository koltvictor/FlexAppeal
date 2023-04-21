import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  contentContainer: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    color: "gray",
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2980b9",
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
  errorContainer: {
    alignItems: "center",
    padding: 10,
  },
  errorMessage: {
    fontWeight: "bold",
    fontSize: 16,
    color: "red",
    marginHorizontal: 20,
    marginTop: 10,
  },
});

export default styles;
