import { View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import styles from "../config/styles/IntroductionStyles";

const IntroductionScreen = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <Swiper loop={false} index={0}>
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
            resizeMode="contain"
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../assets/exercises.png")}
            style={styles.introImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../assets/routine.png")}
            style={styles.introImage}
            resizeMode="contain"
          />
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
            resizeMode="contain"
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../assets/final.png")}
            style={styles.introImage}
            resizeMode="contain"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlePress} style={styles.button}>
              <Text style={styles.buttonText}>Let's Go!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swiper>
    </View>
  );
};

export default IntroductionScreen;
