import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseName: {
    fontSize: 20,
    marginBottom: 8,
    color: colors.white,
  },
  timerAndButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  timerText: {
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 8,
    color: colors.white,
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    padding: 8,
  },
  modalContainer: {
    backgroundColor: colors.navy,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: colors.softblue,
  },
  modalGoalText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    color: colors.lightgrey,
  },
  gif: {
    width: 350,
    height: 350,
    backgroundColor: "black",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 30,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 5,
  },
  timerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.brightblue,
  },
  timerButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  timerModalContainer: {
    padding: 20,
  },
  timerModalText: {
    fontSize: 85,
    fontWeight: "bold",
    color: "white",
  },
  resetButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  repsContainer: {
    alignItems: "center",
  },
  repsText: {
    fontSize: 20,
    color: colors.lightgrey,
    fontWeight: "bold",
  },
});

export default styles;
