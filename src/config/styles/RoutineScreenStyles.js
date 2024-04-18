import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  contentContainer: {
    padding: 20,
    marginBottom: 50,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    color: colors.lightgrey,
  },
  exerciseContainer: {
    marginBottom: 20,
    backgroundColor: colors.slate,
    borderRadius: 10,
    padding: 20,
    shadowColor: colors.black,
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
    color: colors.sandy,
  },
  inputContainer: {
    backgroundColor: colors.navy,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 5,
    left: 5,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.lightgrey,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
    color: colors.white,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.palegreen,
    padding: 20,
    justifyContent: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: colors.navy,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.slate,
    marginRight: 10,
  },
  modalButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  errorContainer: {
    alignItems: "center",
    padding: 10,
  },
  errorMessage: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.red,
    marginHorizontal: 20,
    marginTop: 10,
  },
  pickerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: colors.navy,
    textAlign: "left",
  },
  cyclesContainer: {
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cyclesInput: {
    width: 120,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    backgroundColor: colors.white,
  },
  pickerItemStyle: {
    height: 80,
  },
});

export default styles;
