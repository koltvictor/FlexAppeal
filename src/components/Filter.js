import { useState } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "../config//styles/FilterModalStyles";
import { equipmentTypes } from "../config/filterDataStructure";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const FilterModal = ({ visible, onClose, onApplyFilters }) => {
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
    onClose(); // Close the modal after applying
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Equipment Filters</Text>
        <ScrollView style={styles.filterList}>
          {equipmentTypes.map((type) => (
            <View style={styles.filterItem} key={type.name}>
              <BouncyCheckbox
                isChecked={selectedEquipmentTypes[type.name] || false}
                fillColor="#2980b9" // Customize as needed
                onPress={() => toggleEquipmentType(type.name)}
                style={styles.checkbox} // If you have specific checkbox styles
              />
              <Text style={styles.filterText}>{type.label}</Text>
            </View>
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleApply}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default FilterModal;
