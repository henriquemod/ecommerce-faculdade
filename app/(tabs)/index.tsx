import { Carrier } from "@/components/carrousel";
import { HorizontalIconMenu } from "@/components/horizontal-icon-menu";
import { HorizontalSellCards } from "@/components/horizontal-sell-cards/intex";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../../assets/images/carrousel/img1.jpg";
import Logo2 from "../../assets/images/carrousel/img2.jpg";

export default function HomeScreen() {
  const [text, onChangeText] = useState("");

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} className="h-full">
        <View className="h-full">
          <View className="border-b-zinc-400 border-b">
            <View className="m-4 flex gap-2 flex-row border border-zinc-400 rounded-md p-2 items-center">
              <View className="flex-1">
                <TextInput
                  className="text-xl"
                  onChangeText={onChangeText}
                  value={text}
                />
              </View>
              <View className="border border-zinc-400 h-full" />
              <TouchableOpacity activeOpacity={1} onPress={() => alert(text)}>
                <Ionicons name="search" size={28} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-col h-full justify-start gap-4 p-4 bg-white">
            <Carrier images={[Logo, Logo2]} />
            <HorizontalIconMenu
              menuItems={[
                {
                  icon: "car",
                  label: "Veículos",
                  category: "vehicles",
                },
                {
                  icon: "phone-portrait",
                  label: "Eletrônicos",
                  category: "electronics",
                },
                {
                  icon: "shirt",
                  label: "Roupa",
                  category: "clothing",
                },
                {
                  icon: "home",
                  label: "Casa",
                  category: "home",
                },
                {
                  icon: "fast-food",
                  label: "Alimentos",
                  category: "food",
                },
                {
                  icon: "barbell",
                  label: "Academia",
                  category: "gym",
                },
                {
                  icon: "medical",
                  label: "Medicina",
                  category: "medicine",
                },
              ]}
            />
            <View className="flex gap-4 flex-col">
              <Text className="text-xl">Mais procurados em Veículos</Text>
              <HorizontalSellCards category="vehicles" />
            </View>
            <View className="flex gap-4 flex-col">
              <Text className="text-xl">Mais procurados em Eletrônicos</Text>
              <HorizontalSellCards category="electronics" />
            </View>
            <View className="flex gap-4 flex-col">
              <Text className="text-xl">Mais procurados em Roupas</Text>
              <HorizontalSellCards category="clothing" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
