import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import styles from "../config//styles/FilterStyles";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const FilterModal = ({
  visible,
  onClose,
  onApplyFilters,
  availableEquipmentTypes,
}) => {
  const [selectedEquipmentTypes, setSelectedEquipmentTypes] = useState([]);

  const toggleEquipmentType = (name) => {
    setSelectedEquipmentTypes((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name);
      } else {
        return [...prev, name];
      }
    });
  };

  const handleApply = () => {
    onApplyFilters(selectedEquipmentTypes);
    onClose();
  };

  const clearFilters = () => {
    setSelectedEquipmentTypes([]);
    onApplyFilters([]);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.title}>Equipment Filters</Text>
        <ScrollView style={styles.filterList}>
          {availableEquipmentTypes.map((type) => (
            <View style={styles.filterItem} key={type}>
              <BouncyCheckbox
                isChecked={selectedEquipmentTypes.includes(type)} // Change here
                fillColor="#2980b9"
                onPress={() => toggleEquipmentType(type)}
                style={styles.checkbox}
              />
              <Text style={styles.filterText}>{type}</Text>
            </View>
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonApply} onPress={handleApply}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonClear} onPress={clearFilters}>
              <Text style={styles.buttonText}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default FilterModal;
