import { mockProducts } from "@/constants/mock-data";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/format-money";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SearchScreen() {
  const { category } = useLocalSearchParams<{
    category?: Category;
  }>();
  const [text, onChangeText] = useState("");
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["products", { category }],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = Promise.resolve(
        mockProducts.filter((p) => (!category ? true : p.category === category))
      );
      return response;
    },
  });

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-zinc-500/50 justify-center items-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <View className="flex flex-col h-full justify-start gap-4 p-4 flex-1">
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              return (
                <View className="flex-1 justify-center items-center">
                  <Text className="text-lg">No hay productos</Text>
                </View>
              );
            }}
            renderItem={({ item }) => {
              return (
                <Link
                  className="my-2"
                  href={{ pathname: `/screens/product/${item.id}` as any }}
                >
                  <View className="rounded-md flex flex-row h-32 gap-4 bg-white w-full">
                    <Image
                      source={{ uri: item.images[0] }}
                      style={{
                        width: 120,
                        height: "100%",
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    />
                    <View className="p-2 flex flex-col justify-between">
                      <View className="flex flex-col gap-2">
                        <Text className="text-lg">{item.title}</Text>
                        <Text className="text-lg font-bold">
                          {formatCurrency(item.price)}
                        </Text>
                      </View>
                      <Text className="text-zinc-600">
                        Vendido por: {item.user.username}
                      </Text>
                    </View>
                  </View>
                </Link>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
