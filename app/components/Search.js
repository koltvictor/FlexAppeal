import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

export default function Search({ search, setSearch }) {
  const [clicked, setClicked] = React.useState(false);
  return (
    <SafeAreaView>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        <Feather
          name="search"
          size={15}
          color="black"
          style={{ marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={this.updateSearch}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              setSearch("");
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    position: "relative",
    top: 0,
    width: Dimensions.get("window").width,
    height: 20,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    width: "80%",
    fontSize: 15,
    color: "white",
    marginLeft: 10,
    // textAlign: "center",
  },
});
