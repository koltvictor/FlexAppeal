import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  changeIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  changeIconText: {
    color: "white",
    fontSize: 16,
  },
  formContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  iconContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderRadius: 20,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    padding: 10,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFD700",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  iconOption: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#555",
  },
  selectedIcon: {
    backgroundColor: "#00c9ff",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
});

export default styles;
