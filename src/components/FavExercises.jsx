import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { observer } from "mobx-react-lite";
import favoritesStore from "../stores/FavoritesStore";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import UserContext from "../app/contexts/UserContext";
import {
  useFetchFavoriteExercises,
  handleDelete,
} from "../app/hooks/useFavoritesHooks";
import { Ionicons } from "@expo/vector-icons";
import styles from "../config/styles/FavExercisesStyles";
import commonStyles from "../config/styles/CommonStyles";

export default observer(function FavExercises() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { favorites } = favoritesStore;

  if (user) {
    useFetchFavoriteExercises(user.uid);
  }

  return (
    <ScrollView>
      <View style={commonStyles.centerCenter}>
        <Text style={commonStyles.titleText}>Favourite Exercises</Text>
        <View style={styles.buttonContainer}>
          {favorites.length > 0 ? (
            favorites.map((exercise) => (
              <View key={exercise.id} style={styles.indivContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate("FavExercise", {
                      exercise,
                      fromSavedRoutine: false,
                    })
                  }
                >
                  <Text key={exercise.id} style={styles.exerciseName}>
                    {exercise.name}
                  </Text>
                </TouchableOpacity>
                <Ionicons
                  style={styles.removeIcon}
                  name="close"
                  key={exercise.id}
                  onPress={() => handleDelete(exercise)}
                />
              </View>
            ))
          ) : (
            <Text style={styles.noFaves}>No favorited exercises yet!</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
});
