import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.white,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  routineName: {
    fontSize: 20,
    padding: 10,
    color: colors.white,
    textAlign: "center",
  },
  addExerciseButtonContainer: {
    backgroundColor: colors.palegreen,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addExerciseButtonText: {
    fontSize: 16,
    color: colors.slate,
  },
  exerciseContainer: {
    marginBottom: 20,
    backgroundColor: colors.slate,
    borderRadius: 10,
    padding: 20,
    shadowColor: colors.white,
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
    color: colors.white,
    padding: 10,
  },
  inputContainer: {
    backgroundColor: colors.navy,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
    color: colors.white,
  },
  contentContainer: {
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.slate,
    padding: 20,
    justifyContent: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.sandy,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: colors.white,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.brightblue,
    marginRight: 10,
  },
  modalButtonText: {
    color: colors.slate,
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
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    backgroundColor: colors.white,
  },
  pickerItem: {
    fontSize: 16,
    height: 80,
  },
  timeContainer: {
    flex: 1,
  },
  timeInput: {
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    backgroundColor: colors.white,
  },
  saveButton: {
    position: "absolute",
    bottom: 1,
    right: 20,
    padding: 10,
  },
  deleteButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    padding: 10,
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
