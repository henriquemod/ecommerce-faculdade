import { mockProducts } from "@/constants/mock-data";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
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

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="space-x-2"
    >
      <View className="flex flex-row gap-4">
        {data?.map((advertisement, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() => alert(advertisement.title)}
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
                {advertisement.price?.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
