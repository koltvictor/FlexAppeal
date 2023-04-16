import { Text, View, FlatList } from "react-native";
import React, { Component } from "react";
import SavedRoutinesComponent from "../components/SavedRoutinesComponent";
import useSavedRoutines from "../app/hooks/useSavedRoutines";
import { auth } from "../../firebase";

export default function SavedRoutinesScreen() {
  const uid = auth.currentUser.uid;

  const { isLoading, isError, data: savedRoutines } = useSavedRoutines(uid);
  if (isLoading) {
    return <Text>Loading saved routines...</Text>;
  }

  if (isError) {
    return <Text>Error loading saved routines</Text>;
  }

  return (
    <View>
      <Text>Saved Routines</Text>
      <FlatList
        data={savedRoutines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
