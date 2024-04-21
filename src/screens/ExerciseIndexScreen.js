import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useContext } from "react";
import { DataContext } from "../app/contexts/DataContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../config/styles/ExerciseIndexStyles";
import commonStyles from "../config/styles/CommonStyles";
import useExerciseSearch from "../app/hooks/useExerciseSearch";

export default function ExerciseIndexScreen() {
  const { exercises } = useContext(DataContext);
  const navigation = useNavigation();
  const {
    searchQuery,
    setSearchQuery,
    displayedExercises,
    isLoadingMore,
    loadMore,
  } = useExerciseSearch(exercises);

  const renderExercise = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.exerciseContainer}
        onPress={() =>
          navigation.navigate("ExerciseDetails", { exercise: item })
        }
      >
        <Text style={styles.exerciseName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search exercises"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        {searchQuery && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchQuery("")}
          >
            <Ionicons name="close-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={displayedExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        style={styles.exerciseList}
        contentContainerStyle={styles.exerciseListContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoadingMore && <ActivityIndicator />}
      />
    </SafeAreaView>
  );
}
