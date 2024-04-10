import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../config/styles/RoutineScreenStyles"; // Import your styling

const RoutineModal = ({
  isVisible,
  onClose,
  routineName,
  setRoutineName,
  errorMessage,
  cycles,
  setCycles,
  onSave,
}) => {
  return (
    <Modal visible={isVisible} animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.errorContainer}>
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
          </View>
          <View>
            <TextInput
              style={styles.modalInput}
              placeholder="Routine Name"
              value={routineName}
              onChangeText={setRoutineName}
              placeholderTextColor="gray"
            />
          </View>
          <View style={styles.cyclesContainer}>
            <Text style={styles.pickerTitle}>Number of Cycles:</Text>
            <Picker
              selectedValue={cycles}
              onValueChange={setCycles}
              style={styles.cyclesInput}
              itemStyle={styles.pickerItemStyle}
            >
              {Array.from(Array(20).keys())
                .filter((num) => num > 0)
                .map((num) => (
                  <Picker.Item key={num} label={num.toString()} value={num} />
                ))}
            </Picker>
          </View>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={onSave}
              disabled={!routineName}
            >
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RoutineModal;
