import { View, Text, TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite"; // Import observer
import favoritesStore from "../stores/FavoritesStore";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import UserContext from "../app/contexts/UserContext";
import { useFetchFavoriteExercises } from "../app/hooks/useFavoritesHooks";
import styles from "../config/styles/FavoriteStyles";

export default observer(function FavExercises() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { favorites } = favoritesStore;

  if (user) {
    useFetchFavoriteExercises(user.uid);
  }

  return (
    <View style={styles.targetText}>
      <View>
        <Text>Favorite Exercises</Text>
      </View>
      <View style={styles.listContainer}>
        {favorites.length > 0 ? (
          favorites.map((exercise) => (
            <TouchableOpacity
              key={exercise}
              onPress={() =>
                navigation.navigate("Favorite Exercise", {
                  exercise,
                })
              }
            >
              <Text key={exercise}>{exercise}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No favorited exercises yet!</Text>
        )}
      </View>
    </View>
  );
});
