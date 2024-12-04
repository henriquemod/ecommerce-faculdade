import { Category } from "@/types/category";
import * as Icons from "@expo/vector-icons";
import { Link } from "expo-router";
import { ComponentProps } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const { Ionicons } = Icons;

type MenuCell = {
  icon: ComponentProps<typeof Ionicons>["name"];
  label: string;
  category: Category;
};

type HorizontalIconMenuProps = {
  menuItems: MenuCell[];
};

export const HorizontalIconMenu = ({ menuItems }: HorizontalIconMenuProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="space-x-2 h-24 max-h-24"
    >
      <View className="flex flex-row gap-4">
        {menuItems.map((menuItem, index) => (
          <Link
            href={{
              pathname: `/search`,
              params: {
                category: menuItem.category,
              },
            }}
            key={index}
          >
            <View className="bg-zinc-200 rounded-md w-24 h-24 flex justify-center items-center gap-1">
              <Ionicons name={menuItem.icon} size={28} />
              <Text className="text-sm font-bold">{menuItem.label}</Text>
            </View>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};
