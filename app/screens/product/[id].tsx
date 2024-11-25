import { mockProducts } from "@/constants/mock-data";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/format-money";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthStore } from "@/store/user";
export interface ProductScreenProps {
  product_id: number;
}

export default function ProductScreen() {
  const token = useAuthStore((state) => state.token);
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const handleGoBack = () => {
    if (router.canGoBack()) {
      return router.back();
    } else {
      router.push("/");
      return null;
    }
  };
  const buyPath = useMemo(() => {
    if (token) {
      return `/screens/purchase/${id}/confirm-address-screen`;
    }

    return `/screens/auth/login?redirect=/screens/product/${id}`;
  }, [id, token]);

  if (Array.isArray(id) || !id || isNaN(parseInt(id))) {
    handleGoBack();
  }

  const { data, isLoading } = useQuery<Product | undefined>({
    queryKey: ["products", id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = mockProducts.find((p) => p.id === Number(id));
      return response;
    },
  });

  console.log({ token });

  const buyClass = token ? "bg-green-700" : "bg-green-700/50";
  const chatClass = token ? "bg-zinc-800" : "bg-zinc-800/50";

  const Content = useCallback(() => {
    if (!data) {
      return <Text>Product not found</Text>;
    }

    return (
      <View style={{ flex: 1 }} className="gap-4 h-fit p-4">
        <Image
          source={{ uri: data.images[0] }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 6,
          }}
        />
        <View className="flex flex-col gap-2 mt-4">
          <Text className="text-5xl text-zinc-800">
            {formatCurrency(data.price)}
          </Text>
          <Text className="text-xl text-zinc-800">{data.title}</Text>
        </View>
        <View className="flex flex-col gap-2">
          <Text className="text-xl font-bold text-zinc-800">Descrição</Text>
          <Text className="text-lg text-zinc-800">{data.description}</Text>
        </View>
        <View className="gap-4 justify-end flex-1">
          <Link href={buyPath as any}>
            <View className="rounded-lg p-4 flex justify-center items-center flex-row gap-2 bg-green-700 w-full">
              <Ionicons name="cart-outline" size={18} color="white" />
              <Text className="text-white font-bold">Comprar</Text>
            </View>
          </Link>
          <TouchableOpacity
            onPress={() => alert("Adicionado ao carrinho")}
            disabled={!token}
          >
            <View
              className={[
                "rounded-lg p-4 flex justify-center items-center flex-row gap-2",
                chatClass,
              ].join(" ")}
            >
              <Ionicons name="chatbubbles-outline" size={18} color="white" />
              <Text className="text-white font-bold">Contatar vendedor</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [data]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-zinc-500/50 justify-center items-center">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View className="border-b relative p-4 flex justify-center items-center flex-row h-14">
            <TouchableOpacity
              onPress={() => router.navigate("/")}
              className="absolute left-4"
            >
              <Text>Voltar</Text>
            </TouchableOpacity>
            <Text className="text-lg font-bold">{data?.title}</Text>
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Content />
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}
