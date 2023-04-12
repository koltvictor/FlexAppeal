import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-native";

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView vertical="true">
        {specificTargets.map((specificTarget) => {
          return (
            <View style={styles.listContainer}>
              <Text style={styles.listItem} key={`target-${specificTarget.id}`}>
                {specificTarget.name}
              </Text>
              {/* <Image
                source={{ uri: specificTarget.gifUrl }}
                alt={"gif"}
                style={{ width: "50%", height: "25%", resizeMode: "contain" }}
              /> */}
              <Button
                title="Details"
                onPress={() => navigate(`/${specificTarget.id}`)}
              />
            </View>
          );
        })}

        <TouchableOpacity onPress={() => navigate("/targets")}>
          <Text>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: window.height,
    width: window.width,
    marginBottom: 100,
    paddingVertical: 20,
    marginLeft: 20,
  },
  listContainer: {
    // marginBottom: 83,
  },
  listItem: {
    fontSize: 16,
    padding: 5,
    maxHeight: 100,
  },
});
