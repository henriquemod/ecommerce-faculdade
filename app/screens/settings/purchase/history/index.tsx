// screens/PurchaseHistory.tsx

import { usePurchaseStore } from "@/store/purchase";
import { Purchase } from "@/types/purchase";
import { formatCurrency } from "@/utils/format-money";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PurchaseHistoryScreen() {
  const router = useRouter();
  const { purchases, initializePurchases } = usePurchaseStore();

  useEffect(() => {
    initializePurchases();
  }, [initializePurchases]);

  const renderItem = ({ item }: { item: Purchase }) => (
    <TouchableOpacity
      onPress={() =>
        router.push(`/screens/settings/purchase/details/${item.id}` as any)
      }
      className="flex-row items-center p-4 bg-white rounded-lg shadow mb-4"
    >
      <Image
        source={{ uri: item.product.images[0] }}
        className="w-16 h-16 rounded-md mr-4"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-lg font-bold">{item.product.title}</Text>
        <Text className="text-sm text-gray-600">
          {format(new Date(item.date), "dd MMM yyyy")}
        </Text>
        <Text className="text-sm text-gray-800">
          {formatCurrency(item.product.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="relative p-4 flex justify-center items-center flex-row">
        <TouchableOpacity
          onPress={() => router.canGoBack() && router.back()}
          className="absolute left-4"
        >
          <Text>Voltar</Text>
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-center">
          Histórico de Compras
        </Text>
      </View>
      {!purchases.length ? (
        <Text className="text-lg text-gray-700 text-center mt-3">
          Você ainda não fez nenhuma compra.
        </Text>
      ) : (
        <FlatList
          data={purchases}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
    </SafeAreaView>
  );
}
