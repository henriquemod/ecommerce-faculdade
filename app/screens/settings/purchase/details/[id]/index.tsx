import { usePurchaseStore } from "@/store/purchase";
import { Purchase } from "@/types/purchase";
import { formatCurrency } from "@/utils/format-money";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PurchaseDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { purchases } = usePurchaseStore();
  const [purchase, setPurchase] = useState<Purchase | undefined>(undefined);

  useEffect(() => {
    console.log({ id });
    const loadPurchase = async () => {
      const foundPurchase = purchases.find((p) => p.id === id);
      setPurchase(foundPurchase);
    };
    loadPurchase();
  }, [id, purchases]);

  if (!purchase) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-gray-700">Compra não encontrada.</Text>
      </SafeAreaView>
    );
  }

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
          Detalhes da Compra
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Image
          source={{ uri: purchase.product.images[0] }}
          className="w-full h-64 rounded-md mb-4"
          resizeMode="cover"
        />

        <View className="mb-4">
          <Text className="text-xl font-semibold">Produto:</Text>
          <Text className="text-lg">{purchase.product.title}</Text>
          <Text className="text-lg text-green-600">
            {formatCurrency(purchase.product.price)}
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-xl font-semibold">Data da Compra:</Text>
          <Text className="text-lg">
            {format(new Date(purchase.date), "dd MMM yyyy, HH:mm")}
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-xl font-semibold">Endereço de Entrega:</Text>
          <Text className="text-lg">
            {purchase.address.street}, {purchase.address.number}
          </Text>
          {purchase.address.complement && (
            <Text className="text-lg">{purchase.address.complement}</Text>
          )}
          <Text className="text-lg">
            {purchase.address.city}, {purchase.address.state} -{" "}
            {purchase.address.zipCode}
          </Text>
        </View>

        {purchase.deliveryInstructions && (
          <View className="mb-4">
            <Text className="text-xl font-semibold">
              Instruções de Entrega:
            </Text>
            <Text className="text-lg">{purchase.deliveryInstructions}</Text>
          </View>
        )}

        <View className="mb-4">
          <Text className="text-xl font-semibold">Método de Pagamento:</Text>
          <Text className="text-lg capitalize">
            {purchase.paymentMethod.replace("_", " ")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
