import { useAuthStore } from "@/store/user";
import { Link, useFocusEffect, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MenuScreen() {
  const route = useRouter();
  const { token, clearAuth, user } = useAuthStore((store) => store);

  useFocusEffect(
    useCallback(() => {
      if (!token || !user) {
        route.navigate("/screens/auth/login?redirect=/");
      }
    }, [token, user])
  );

  return (
    <SafeAreaView>
      <View className="h-full flex flex-col">
        <Link href="/screens/settings/profile">
          <View className="border-b border-zinc-400 p-8 flex flex-row items-center gap-4 w-full">
            <Ionicons name="person-circle-outline" size={32} color="#27272a" />
            <Text className="text-zinc-800">Perfil</Text>
          </View>
        </Link>
        <TouchableOpacity className="border-b border-zinc-400 p-8 flex flex-row items-center gap-4">
          <Ionicons name="bar-chart-outline" size={32} color="#27272a" />
          <Text className="text-zinc-800">Minhas vendas</Text>
        </TouchableOpacity>

        <Link href="/screens/settings/purchase/history">
          <View className="border-b border-zinc-400 p-8 flex flex-row items-center gap-4 w-full">
            <Ionicons name="cart-outline" size={32} color="#27272a" />
            <Text className="text-zinc-800">Minhas compras</Text>
          </View>
        </Link>
        <TouchableOpacity
          className="border-b border-zinc-400 p-8 flex flex-row items-center gap-4"
          onPress={clearAuth}
        >
          <Ionicons name="exit-outline" size={32} color="#27272a" />
          <Text className="text-zinc-800">Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
