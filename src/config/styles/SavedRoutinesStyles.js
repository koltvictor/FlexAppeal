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
    width: "75%",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 10,
  },
  sharedIcon: {
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.navy,
  },
  shareModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.navy,
  },
  modalContent: {
    backgroundColor: colors.slate,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  shareModalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.white,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 5,
    width: 325,
    padding: 10,
    marginBottom: 20,
    color: colors.white,
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
  },
  modalButton: {
    backgroundColor: colors.palegreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.black,
    marginHorizontal: 5,
    justifyContent: "center",
  },
  modalButtonNo: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: colors.black,
    marginHorizontal: 5,
    justifyContent: "center",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
  listHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.sandy,
    textAlign: "center",
  },
  sharedByText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.palegreen,
    textAlign: "center",
  },
});

export default styles;
