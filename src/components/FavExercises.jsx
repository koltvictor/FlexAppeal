import { View, Text } from "react-native";
import { observer } from "mobx-react-lite"; // Import observer
import favoritesStore from "../stores/FavoritesStore";

export default observer(function FavExercises() {
  return (
    <View>
      {favoritesStore.favorites.favexercises.map((exerciseName) => (
        <Text key={exerciseName}>{exerciseName}</Text>
      ))}
    </View>
  );
});
