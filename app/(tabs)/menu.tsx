import { useAuthStore } from "@/store/user";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MenuScreen() {
  const route = useRouter();
  const { token, clearToken } = useAuthStore((store) => store);

  useFocusEffect(
    useCallback(() => {
      if (!token) {
        route.navigate("/screens/auth/login?redirect=/");
      }
    }, [token])
  );

  return (
    <SafeAreaView>
      <View className="h-full flex flex-col">
        <TouchableOpacity className="border-b border-zinc-400 p-8 flex flex-row items-center gap-4">
          <Ionicons name="person-circle-outline" size={32} color="#27272a" />
          <Text className="text-zinc-800">Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border-b border-zinc-400 p-8 flex flex-row items-center gap-4">
          <Ionicons name="bar-chart-outline" size={32} color="#27272a" />
          <Text className="text-zinc-800">Minhas vendas</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border-b border-zinc-400 p-8 flex flex-row items-center gap-4">
          <Ionicons name="cart-outline" size={32} color="#27272a" />
          <Text className="text-zinc-800">Minhas compras</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border-b border-zinc-400 p-8 flex flex-row items-center gap-4"
          onPress={clearToken}
        >
          <Ionicons name="exit-outline" size={32} color="#27272a" />
          <Text className="text-zinc-800">Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
