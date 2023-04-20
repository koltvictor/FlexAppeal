import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseName: {
    fontSize: 20,
    marginBottom: 8,
    color: "darkgrey",
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
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
    color: "red",
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    padding: 8,
  },

  timerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#007AFF",
  },
  timerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
});

export default styles;
