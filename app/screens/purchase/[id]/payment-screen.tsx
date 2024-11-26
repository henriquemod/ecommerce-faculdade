import "react-native-get-random-values";
import { useAuthStore } from "@/store/user";
import { usePurchaseStore } from "@/store/purchase";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import { Purchase } from "@/types/purchase";
import { v4 as uuidv4 } from "uuid";
import { mockProducts } from "@/constants/mock-data";

interface PaymentFormValues {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
}

const PaymentSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .matches(/^[0-9]{16}$/, "Numero do cartão deve ter 16 dígitos")
    .required("Numero do cartão é obrigatório"),
  expiryDate: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Data de expiração inválida (MM/YY)"
    )
    .required("Data de expiração é obrigatória"),
  cvv: Yup.string()
    .matches(/^[0-9]{3,4}$/, "CVV precisa ter 3 ou 4 dígitos")
    .required("CVV é obrigatório"),
  cardHolderName: Yup.string()
    .min(3, "Nome do titular do cartão deve ter no mínimo 3 caracteres")
    .required("Nome do titular do cartão é obrigatório"),
});

export default function PaymentScreen() {
  const { user } = useAuthStore();
  const { addPurchase } = usePurchaseStore();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!user) {
    router.replace("/auth/login?redirect=/" as any);
    return null;
  }

  const initialValues: PaymentFormValues = {
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  };

  const handlePayment = async (
    values: PaymentFormValues,
    { setSubmitting }: FormikHelpers<PaymentFormValues>
  ) => {
    try {
      console.log({ values });
      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create a new Purchase object
      const newPurchase: Purchase = {
        id: uuidv4(), // Generate a unique ID
        product: mockProducts.find((p) => p.id === Number(id))!, // Assuming mockProducts is accessible
        date: new Date().toISOString(),
        address: user.address,
        // deliveryInstructions: user.deliveryInstructions, // Assuming this field exists
        paymentMethod: "credit_card",
      };

      // Save the purchase to the store
      await addPurchase(newPurchase);

      Toast.show({
        type: "success",
        text1: "Pagamento Concluído",
        text2: "Seu pagamento foi processado com sucesso!",
        position: "top",
        visibilityTime: 4000,
      });

      // Redirect to Home or another appropriate screen
      router.replace("/");
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Erro de Pagamento",
        text2:
          "Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente.",
        position: "top",
        visibilityTime: 4000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View className="relative p-4 flex justify-center items-center flex-row">
          <TouchableOpacity
            onPress={() => router.canGoBack() && router.back()}
            className="absolute left-4"
          >
            <Text>Voltar</Text>
          </TouchableOpacity>
          <Text className="text-3xl font-bold text-center">Pagamento</Text>
        </View>
        <View className="flex-1 h-full p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={PaymentSchema}
            onSubmit={handlePayment}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View className="space-y-4 flex-1 gap-2">
                {/* Card Number */}
                <View>
                  <Text className="text-lg mb-1">Numero do cartão</Text>
                  <TextInput
                    className={`border rounded-md p-3 bg-white ${
                      touched.cardNumber && errors.cardNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="1234 5678 9012 3456"
                    value={values.cardNumber}
                    onChangeText={handleChange("cardNumber")}
                    onBlur={handleBlur("cardNumber")}
                    keyboardType="numeric"
                    maxLength={16}
                  />
                  {touched.cardNumber && errors.cardNumber && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.cardNumber}
                    </Text>
                  )}
                </View>

                {/* Expiry Date */}
                <View>
                  <Text className="text-lg mb-1">
                    Data de expiração (MM/YY)
                  </Text>
                  <TextInput
                    className={`border rounded-md p-3 bg-white ${
                      touched.expiryDate && errors.expiryDate
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="MM/YY"
                    value={values.expiryDate}
                    onChangeText={handleChange("expiryDate")}
                    onBlur={handleBlur("expiryDate")}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                  {touched.expiryDate && errors.expiryDate && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.expiryDate}
                    </Text>
                  )}
                </View>

                {/* CVV */}
                <View>
                  <Text className="text-lg mb-1">CVV</Text>
                  <TextInput
                    className={`border rounded-md p-3 bg-white ${
                      touched.cvv && errors.cvv
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="123"
                    value={values.cvv}
                    onChangeText={handleChange("cvv")}
                    onBlur={handleBlur("cvv")}
                    keyboardType="numeric"
                    secureTextEntry
                    maxLength={4}
                  />
                  {touched.cvv && errors.cvv && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.cvv}
                    </Text>
                  )}
                </View>

                {/* Cardholder Name */}
                <View>
                  <Text className="text-lg mb-1">
                    Nome do titular do cartão
                  </Text>
                  <TextInput
                    className={`border rounded-md p-3 bg-white ${
                      touched.cardHolderName && errors.cardHolderName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="John Doe"
                    value={values.cardHolderName}
                    onChangeText={handleChange("cardHolderName")}
                    onBlur={handleBlur("cardHolderName")}
                    autoCapitalize="words"
                  />
                  {touched.cardHolderName && errors.cardHolderName && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.cardHolderName}
                    </Text>
                  )}
                </View>

                {/* Submit Button */}
                <View className="flex-1 justify-end">
                  <TouchableOpacity
                    className={`mt-6 px-4 py-3 rounded-md bg-purple-500 ${
                      isSubmitting ? "bg-purple-300" : ""
                    }`}
                    onPress={() => handleSubmit()}
                    disabled={isSubmitting}
                  >
                    <View className="flex-row items-center justify-center gap-4">
                      <Ionicons name="card-outline" size={20} color="white" />
                      <Text className="text-white text-center text-lg font-semibold">
                        {isSubmitting ? "Processando..." : "Realizar pagamento"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}
