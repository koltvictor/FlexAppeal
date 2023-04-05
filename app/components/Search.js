import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ({ clicked, search, setSearch, setClicked }) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
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
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
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
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});

// import React from "react";
// import {
//   Dimensions,
//   SafeAreaView,
//   StyleSheet,
//   TextInput,
//   View,
// } from "react-native";
// import { Feather, Entypo } from "@expo/vector-icons";

// export default function Search({ search, setSearch }) {
//   const [clicked, setClicked] = React.useState(false);
//   return (
//     <SafeAreaView>
//       <View
//         style={
//           clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
//         }
//       >
//         <Feather
//           name="search"
//           size={15}
//           color="black"
//           style={{ marginLeft: 1 }}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Search"
//           //   onChangeText={this.updateSearch}
//           value={search}
//           //   onChange={(e) => setSearch(e.target.value)}
//           onChange={(e) => console.log(e.target.value)}
//           onFocus={() => {
//             setClicked(true);
//           }}
//         />
//         {clicked && (
//           <Entypo
//             name="cross"
//             size={20}
//             color="black"
//             style={{ padding: 1 }}
//             onPress={() => {
//               setSearch("");
//             }}
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   searchContainer: {
//     position: "relative",
//     top: 0,
//     width: Dimensions.get("window").width,
//     height: 20,
//     backgroundColor: "lightgrey",
//     borderRadius: 10,
//     margin: 15,
//     justifyContent: "flex-start",
//     alignItems: "center",
//     flexDirection: "row",
//     width: "90%",
//   },
//   searchBar__unclicked: {
//     padding: 10,
//     flexDirection: "row",
//     width: "95%",
//     backgroundColor: "#d9dbda",
//     borderRadius: 15,
//     alignItems: "center",
//   },
//   searchBar__clicked: {
//     padding: 10,
//     flexDirection: "row",
//     width: "95%",
//     backgroundColor: "#d9dbda",
//     borderRadius: 15,
//     alignItems: "center",
//     justifyContent: "space-evenly",
//   },
//   input: {
//     width: "80%",
//     fontSize: 15,
//     color: "white",
//     marginLeft: 10,
//     // textAlign: "center",
//   },
// });
