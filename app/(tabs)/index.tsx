import { Carrier } from "@/components/carrousel";
import { HorizontalIconMenu } from "@/components/horizontal-icon-menu";
import { HorizontalSellCards } from "@/components/horizontal-sell-cards/intex";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  SafeAreaView,
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
        <View className="flex flex-col h-full justify-start gap-4 p-4">
          <Carrier images={[Logo, Logo2]} />
          <HorizontalIconMenu
            menuItems={[
              {
                icon: "car",
                label: "Veículos",
              },
              {
                icon: "phone-portrait",
                label: "Eletrônicos",
              },
              {
                icon: "shirt",
                label: "Roupa",
              },
              {
                icon: "home",
                label: "Casa",
              },
              {
                icon: "fast-food",
                label: "Alimentos",
              },
              {
                icon: "barbell",
                label: "Academia",
              },
              {
                icon: "medical",
                label: "Medicina",
              },
            ]}
          />
          <View>
            <Text className="text-xl">Mais procurados em Veículos</Text>
            <HorizontalSellCards
              advertisements={[
                {
                  user: {
                    email: "email",
                    phone: "asd",
                    username: "asd",
                  },
                  category: "clothing",
                  description: "asd",
                  images: ["asd"],
                  price: 123,
                  title: "asd",
                },
              ]}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}