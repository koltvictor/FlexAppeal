import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import styles from "../config/styles/IntroductionStyles";

const IntroductionScreen = ({ navigation }) => {
  const handleGotItClick = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <Swiper showsButtons={false}>
        <View
          style={styles.slide}
          options={{
            statusbar: false,
            title: "",
            headerStyle: { backgroundColor: "black" },
          }}
        >
          <Image
            source={require("../assets/dashboard.png")}
            style={styles.introImage}
          />
          <Text style={styles.text}>Explanation of the DashboardScreen</Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../assets/exercises.png")}
            style={styles.introImage}
          />
          <Text style={styles.text}>Explanation of the TargetsScreen</Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../assets/routine.png")}
            style={styles.introImage}
          />
          <Text style={styles.text}>Explanation of the RoutineScreen</Text>
        </View>
        <View
          style={styles.slide}
          options={{
            statusbar: false,
            title: "",
            headerStyle: { backgroundColor: "black" },
          }}
        >
          <Image
            source={require("../assets/saved_routines.png")}
            style={styles.introImage}
          />
          <TouchableOpacity style={styles.button} onPress={handleGotItClick}>
            <Text style={styles.buttonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    </View>
  );
};

export default IntroductionScreen;
