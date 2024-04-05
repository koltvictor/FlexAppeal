import { Image, SafeAreaView, View, Text } from "react-native";

export default function FavExerciseScreen({ route }) {
  const exerciseId = route.params.exercise;
  console.log(exerciseId);

  return (
    <SafeAreaView>
      <Text>Hi</Text>
    </SafeAreaView>
  );
}
