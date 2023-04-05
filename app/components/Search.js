import React from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";

export default function Search() {
  const [search, setSearch] = React.useState("");
  return (
    <View style={searchStyles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={this.updateSearch}
        value={search}
      />
    </View>
  );
}

const searchStyles = StyleSheet.create({
  searchContainer: {
    position: "relative",
    top: 0,
    // padding: 20,
    width: Dimensions.get("window").width,
    height: 20,
    backgroundColor: "lightgrey",
    alignItems: "center",
    borderRadius: 10,
  },
});

const styles = StyleSheet.create({
  input: {
    width: "100%",
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
});
