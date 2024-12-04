import { usePurchaseStore } from "@/store/purchase";
import { Purchase, DeliveryOption } from "@/types/purchase"; // Ensure DeliveryOption is imported
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

  // Define the delivery options mapping
  const deliveryOptionsMap = {
    pickup_center: {
      label: "Retirar em um centro de distribuição próximo",
      message: "Economia de 10% retirando no local",
      messageType: "success", // For green label
    },
    pickup_entry: {
      label: "Retirar na entrada/portaria do prédio",
      message: null, // No message for this option
      messageType: null,
    },
    delivery_door: {
      label: "Receber na porta de casa/apartamento",
      message:
        "Entregas na porta possuem um adicional de 30% no valor da entrega",
      messageType: "warning", // For orange label
    },
  };

  // Get the delivery option details
  const deliveryOptionDetails = deliveryOptionsMap[purchase.deliveryOption];

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

        {/* **New Section: Delivery Method** */}
        <View className="mb-4">
          <Text className="text-xl font-semibold">Método de Entrega:</Text>
          <Text className="text-lg">{deliveryOptionDetails.label}</Text>
          {deliveryOptionDetails.message && (
            <View
              className={`mt-2 p-2 border rounded-md ${
                deliveryOptionDetails.messageType === "success"
                  ? "bg-green-100 border-green-400"
                  : deliveryOptionDetails.messageType === "warning"
                  ? "bg-orange-100 border-orange-400"
                  : ""
              }`}
            >
              <Text
                className={`text-sm ${
                  deliveryOptionDetails.messageType === "success"
                    ? "text-green-800"
                    : deliveryOptionDetails.messageType === "warning"
                    ? "text-orange-800"
                    : ""
                }`}
              >
                {deliveryOptionDetails.message}
              </Text>
            </View>
          )}
        </View>
        {/* **End of New Section** */}

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
