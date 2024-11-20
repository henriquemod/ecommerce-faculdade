import { Advertisement } from "@/types/advertisement";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type HorizontalSellCardsProps = {
  advertisements: Advertisement[];
};

export const HorizontalSellCards = ({
  advertisements,
}: HorizontalSellCardsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="space-x-2 h-24 max-h-24"
    >
      <View className="flex flex-row gap-4">
        {advertisements.map((advertisement, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            className="bg-zinc-200 rounded-md w-24 flex justify-center items-center gap-1"
          >
            <Text className="text-base font-bold">{advertisement.title}</Text>
            <Text className="text-sm">{advertisement.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
