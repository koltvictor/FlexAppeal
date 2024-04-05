import { Image, SafeAreaView, View, Text } from "react-native";
import { useExerciseName } from "../app/hooks/useExerciseDetails";
import { options } from "../app/contexts/DataContext";

export default function FavExerciseScreen({ route }) {
  const exerciseName = route.params.exercise;
  console.log(exerciseName);
  const { exerciseDetails, isLoading } = useExerciseName(exerciseName, options);

  return (
    <SafeAreaView>
      {isLoading && <Text>Loading exercise data...</Text>}

      {exerciseDetails && (
        <View>
          {exerciseDetails.map((exercise) => (
            <View key={exercise.id} style={{ marginBottom: 10 }}>
              <Text>{exercise.name}</Text>
              <Image
                alt={exercise.gifUrl}
                source={{ uri: exercise.gifUrl }}
                style={{ width: 100, height: 100 }}
              />
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}
