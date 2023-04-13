import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-native";
import BottomNav from "../components/BottomNav";

export default function GroupsScreen() {
  let params = useParams();
  let navigate = useNavigate();

  const [specificTargets, setSpecificTargets] = useState([]);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9074bf701emsh2b8696dac91ac18p161ae0jsn7153acb84d2d",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };
  useEffect(() => {
    const getSpecificTargets = async () => {
      const response = await fetch(
        `https://exercisedb.p.rapidapi.com/exercises/target/${params.target}`,
        options
      );
      const data = await response.json();
      setSpecificTargets(data);
    };
    getSpecificTargets();
  }, []);
  console.log("hello");
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.listContainer} vertical="true">
        {specificTargets.map((specificTarget) => {
          return (
            <View key={`${specificTarget.id}`}>
              <Text
                style={styles.listItem}
                onPress={() => navigate(`/exercise/${specificTarget.id}`)}
              >
                {specificTarget.name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View>
        <BottomNav
        //   isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: window.height,
    width: window.width,
    // marginBottom: 100,
    paddingVertical: 20,
    // marginLeft: 20,
  },
  listContainer: {
    marginBottom: 83,
    marginLeft: 20,
  },
  listItem: {
    fontSize: 14,
    padding: 5,
  },
});
