import { mockProducts } from "@/constants/mock-data";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/format-money";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

type HorizontalSellCardsProps = {
  category: Category;
};

export const HorizontalSellCards = ({ category }: HorizontalSellCardsProps) => {
  const { data } = useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async () => {
      const response = Promise.resolve(
        mockProducts.filter((p) => p.category === category).slice(0, 5)
      );
      return response;
    },
  });

  if (!data) {
    return null;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="space-x-2"
    >
      <View className="flex flex-row gap-4">
        {data?.map((advertisement, index) => {
          return (
            <Link
              key={index}
              href={{
                pathname: `/screens/product/${advertisement.id}` as any,
              }}
              style={{ width: 168 }}
              className="bg-white rounded-md flex justify-start items-center gap-1 border border-zinc-400"
            >
              <Image
                source={{
                  uri:
                    advertisement.images[0].length > 0
                      ? advertisement.images[0]
                      : "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
                }}
                className="rounded-t-md w-full h-32"
              />
              <View className="p-2 flex gap-2">
                <Text className="text-sm font-bold" numberOfLines={2}>
                  {advertisement.title}
                </Text>
                <Text className="text-sm text-pretty" numberOfLines={3}>
                  {advertisement.description}
                </Text>
                <Text className="text-sm font-bold">
                  {formatCurrency(advertisement.price || 0)}
                </Text>
              </View>
            </Link>
          );
        })}
      </View>
    </ScrollView>
  );
};
