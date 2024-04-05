import { View, Text, TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite"; // Import observer
import favoritesStore from "../stores/FavoritesStore";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import UserContext from "../app/contexts/UserContext";
import { useFetchFavoriteExercises } from "../app/hooks/useFavoritesHooks";
import { FavoritesContext } from "../app/contexts/FavoritesContext";

export default observer(function FavExercises() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { favorites } = favoritesStore;
  console.log("faves!", favorites);

  if (user) {
    useFetchFavoriteExercises(user.uid);
  }

  return (
    <View>
      {favorites.length > 0 ? (
        favorites.map((exercise) => (
          <TouchableOpacity
            key={exercise}
            onPress={() =>
              navigation.navigate("ExerciseDetails", {
                exercise,
                fromSavedRoutine: false,
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
  );
});
