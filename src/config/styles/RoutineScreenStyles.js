import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
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
    paddingBottom: 30,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: colors.sandy,
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
});

export default styles;
