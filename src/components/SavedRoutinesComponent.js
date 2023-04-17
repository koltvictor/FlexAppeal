import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { auth, db } from "../../firebase";

export default function SavedRoutinesComponent({ data }) {
  return (
    <View>
      <Text>My Saved Routines:</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.exercises}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
