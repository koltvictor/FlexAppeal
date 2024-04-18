import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import RoutineModal from "../components/RoutineModal";
import { Ionicons } from "@expo/vector-icons";
import routineStore from "../stores/RoutineStore";
import RoutineItem from "../components/RoutineItem";
import { observer } from "mobx-react-lite";
import styles from "../config/styles/RoutineScreenStyles";
import { useRoutine } from "../app/hooks/useRoutine";
import DraggableFlatList from "react-native-draggable-flatlist";
import { toJS } from "mobx";

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
      <View style={styles.contentContainer}>
        {routineStore.routine.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No exercises added to routine</Text>
          </View>
        ) : (
          <DraggableFlatList
            data={toJS(routineStore.routine)}
            renderItem={({ item, index, drag, isActive }) => (
              <View style={styles.exerciseContainer} key={item.id}>
                <RoutineItem
                  exercise={item}
                  index={index}
                  exerciseId={item.id}
                  handleRepsChange={handleRepsChange}
                  handleTimeChange={handleTimeChange}
                  drag={drag}
                  isActive={isActive}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
            onDragEnd={({ data }) => {
              routineStore.setRoutine(data);
            }}
          />
        )}
      </View>

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
