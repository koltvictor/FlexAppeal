import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  routineContainer: {
    backgroundColor: colors.slate,
    borderRadius: 10,
    marginBottom: 20,
    padding: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  routineName: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
    fontFamily: "Helvetica",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
  },
  icon: {},
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
});

export default styles;
