import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  header: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
    fontFamily: "Helvetica",
  },
  routineContainer: {
    backgroundColor: "#333333",
    borderRadius: 10,
    marginBottom: 20,
    padding: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  routineName: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
    fontFamily: "Helvetica",
  },
  deleteText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
    fontFamily: "Helvetica",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 0, 0, 0.9)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#000",
    marginHorizontal: 5,
    justifyContent: "center",
  },
  modalButtonNo: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#000",
    marginHorizontal: 5,
    justifyContent: "center",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  modalDeletedText: {},
});

export default styles;
