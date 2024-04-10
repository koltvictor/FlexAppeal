import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import RoutineModal from "../components/RoutineModal";
import { Ionicons } from "@expo/vector-icons";
import routineStore from "../stores/RoutineStore";
import RoutineItem from "../components/RoutineItem";
import { observer } from "mobx-react-lite";
import styles from "../config/styles/RoutineScreenStyles";
import { useRoutine } from "../app/hooks/useRoutine";

const RoutineScreen = observer(() => {
  const {
    isModalVisible,
    setIsModalVisible,
    routineName,
    setRoutineName,
    errorMessage,
    cycles,
    setCycles,
    handleSaveRoutine,
    onCancel,
    handleRepsChange,
    handleTimeChange,
  } = useRoutine();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {routineStore.routine.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No exercises added to routine</Text>
          </View>
        ) : (
          routineStore.routine.map((exercise, index) => (
            <View key={exercise.id} style={styles.exerciseContainer}>
              <RoutineItem
                exercise={exercise}
                index={index}
                exerciseId={exercise.id}
                handleRepsChange={handleRepsChange}
                handleTimeChange={handleTimeChange}
              />
            </View>
          ))
        )}
      </ScrollView>

      <RoutineModal
        isVisible={isModalVisible}
        onClose={onCancel}
        routineName={routineName}
        setRoutineName={setRoutineName}
        errorMessage={errorMessage}
        cycles={cycles}
        setCycles={setCycles}
        onSave={handleSaveRoutine}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          disabled={routineStore.routine.length === 0}
        >
          <Ionicons name="checkmark-circle-outline" size={32} color="#2980b9" />
          <Text style={{ color: "white" }}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default RoutineScreen;
