import { Image, SafeAreaView, View, Text, ScrollView } from "react-native";
import styles from "../config/styles/FavExerciseScreenStyles";
import commonStyles from "../config/styles/CommonStyles";

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
    <SafeAreaView style={commonStyles.container}>
      <ScrollView>
        <Text style={commonStyles.titleText}>{exercise.name}</Text>
        <View style={styles.gifContainer}>
          <Image src={exercise.gifUrl} alt={exercise.name} style={styles.gif} />
        </View>
        <View style={commonStyles.centerCenter}>
          <Text style={commonStyles.text}>
            {formatInstructions(exercise.instructions)}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
