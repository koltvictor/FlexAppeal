import React from "react";
import { useNavigate } from "react-router-native";
import { Link } from "@react-navigation/native";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Search from "../components/Search";

export default function ExercisesScreen({
  filteredExercises,
  search,
  setSearch,
  clicked,
  setClicked,
}) {
  const navigate = useNavigate();
  return (
    <SafeAreaView>
      <View>
        <Search
          search={search}
          setSearch={setSearch}
          clicked={clicked}
          setClicked={setClicked}
        />
        <Button
          title="back to dashboard"
          onPress={() => navigate("/dashboard")}
          style={styles.button}
        />
        <ScrollView vertical="true">
          {filteredExercises.map((exercise, id) => (
            <Text key={id} onPress={() => navigate(`/exercise/${id}`)}>
              {id}
            </Text>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: { position: "absolute", bottom: 0 },
});
