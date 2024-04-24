import { StyleSheet } from "react-native";
import colors from "../colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 2,
    margin: 5,
    overflow: "hidden",
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
  button: {
    backgroundColor: colors.brightblue,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 25,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    position: "relative",
  },
  instructionsButton: {
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 25,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  instructionsButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  instructions: {
    fontSize: 20,
    padding: 20,
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  modalText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
