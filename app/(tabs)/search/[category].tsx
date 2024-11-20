import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";

export default function SearchScreen() {
  const { category } = useLocalSearchParams();
  const [text, onChangeText] = useState("");

  console.log({ category });

  return (
    <SafeAreaView>
      <View className="h-full">
        <View className="border-b-zinc-400 border-b">
          <View className="m-4 flex gap-2 flex-row border border-zinc-400 rounded-md p-2 items-center">
            <View className="flex-1">
              <TextInput
                className="text-xl"
                onChangeText={onChangeText}
                value={text}
              />
            </View>
            <View className="border border-zinc-400 h-full" />
            <TouchableOpacity activeOpacity={1} onPress={() => alert(text)}>
              <Ionicons name="search" size={28} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-col h-full justify-start gap-4 p-4"></View>
      </View>
    </SafeAreaView>
  );
}
