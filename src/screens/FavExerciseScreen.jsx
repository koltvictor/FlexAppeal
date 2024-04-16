import { Image, SafeAreaView, View, Text, ScrollView } from "react-native";
import styles from "../config/styles/FavExerciseScreenStyles";

export default function FavExerciseScreen({ route }) {
  const exercise = route.params.exercise;

  function formatInstructions(instructions) {
    if (!Array.isArray(instructions) || !instructions.length) {
      return "";
    }

    const formattedInstructions = instructions
      .map((sentence, index) => {
        return `${index + 1}) ${sentence.trim()}\n`;
      })
      .join("");

    return formattedInstructions;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.title}>{exercise.name}</Text>
        <Text>{formatInstructions(exercise.instructions)}</Text>
        <Image
          src={exercise.gifUrl}
          alt={exercise.name}
          style={{ width: 400, height: 400 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
