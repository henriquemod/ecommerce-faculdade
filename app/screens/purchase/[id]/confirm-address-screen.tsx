import { useAuthStore } from "@/store/user";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
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

interface ConfirmAddressFormValues {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  number: string;
  complement?: string;
  deliveryInstructions?: string;
}

const ConfirmAddressSchema = Yup.object().shape({
  street: Yup.string().required("Rua é obrigatória"),
  city: Yup.string().required("Cidade é obrigatória"),
  state: Yup.string().required("Estado é obrigatório"),
  zipCode: Yup.string().required("CEP é obrigatório"),
  deliveryInstructions: Yup.string().optional(),
});

export default function ConfirmAddressScreen() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    if (!user) {
      router.replace("/screens/auth/login?redirect=/");
    }
  }, [user]);

  const initialValues: ConfirmAddressFormValues = {
    street: user?.address.street || "",
    city: user?.address.city || "",
    state: user?.address.state || "",
    zipCode: user?.address.zipCode || "",
    number: user?.address.number || "",
    complement: user?.address.complement,
    deliveryInstructions: "",
  };

  const handleConfirmAddress = async (
    values: ConfirmAddressFormValues,
    { setSubmitting }: FormikHelpers<ConfirmAddressFormValues>
  ) => {
    if (!user) return;
    try {
      const updatedUser = {
        ...user,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
          number: values.number,
          complement: values.complement,
        },
        deliveryInstructions: values.deliveryInstructions,
      };

      await setUser(updatedUser);

      router.navigate(`screens/purchase/${id}/payment-screen` as any);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Erro ao Atualizar Endereço",
        text2: "Houve um erro ao atualizar seu endereço.",
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
          <Text className="text-3xl font-bold text-center">
            Confirmar Endereço
          </Text>
        </View>
        <View className="flex-1 h-full p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={ConfirmAddressSchema}
            onSubmit={handleConfirmAddress}
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
                <View className="flex flex-row gap-4">
                  <View className="flex-1">
                    <Text className="text-lg mb-1">Rua</Text>
                    <TextInput
                      className={`border rounded-md p-3 bg-white ${
                        touched.street && errors.street
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Street"
                      value={values.street}
                      onChangeText={handleChange("street")}
                      onBlur={handleBlur("street")}
                    />
                    {touched.street && errors.street && (
                      <Text className="text-red-500 text-sm mt-1">
                        {errors.street}
                      </Text>
                    )}
                  </View>
                  <View className="w-24">
                    <Text className="text-lg mb-1">Numero</Text>
                    <TextInput
                      className={`border rounded-md p-3 bg-white ${
                        touched.number && errors.number
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Numero"
                      value={values.number}
                      onChangeText={handleChange("number")}
                      onBlur={handleBlur("number")}
                    />
                    {touched.number && errors.number && (
                      <Text className="text-red-500 text-sm mt-1">
                        {errors.number}
                      </Text>
                    )}
                  </View>
                </View>
                <View>
                  <Text className="text-lg mb-1">Complemento</Text>
                  <TextInput
                    className={`border rounded-md p-3 bg-white ${
                      touched.complement && errors.complement
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Complemento"
                    value={values.complement}
                    onChangeText={handleChange("complement")}
                    onBlur={handleBlur("complement")}
                  />
                  {touched.complement && errors.complement && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.complement}
                    </Text>
                  )}
                </View>
                <View className="flex flex-row gap-4">
                  <View className="flex-1">
                    <Text className="text-lg mb-1">Cidade</Text>
                    <TextInput
                      className={`border rounded-md p-3 bg-white ${
                        touched.city && errors.city
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="City"
                      value={values.city}
                      onChangeText={handleChange("city")}
                      onBlur={handleBlur("city")}
                    />
                    {touched.city && errors.city && (
                      <Text className="text-red-500 text-sm mt-1">
                        {errors.city}
                      </Text>
                    )}
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg mb-1">Estado</Text>
                    <TextInput
                      className={`border rounded-md p-3 bg-white ${
                        touched.state && errors.state
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="State"
                      value={values.state}
                      onChangeText={handleChange("state")}
                      onBlur={handleBlur("state")}
                    />
                    {touched.state && errors.state && (
                      <Text className="text-red-500 text-sm mt-1">
                        {errors.state}
                      </Text>
                    )}
                  </View>
                </View>
                <View>
                  <Text className="text-lg mb-1">CEP</Text>
                  <TextInput
                    className={`border rounded-md p-3 bg-white ${
                      touched.zipCode && errors.zipCode
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="ZIP Code"
                    value={values.zipCode}
                    onChangeText={handleChange("zipCode")}
                    onBlur={handleBlur("zipCode")}
                    keyboardType="numeric"
                  />
                  {touched.zipCode && errors.zipCode && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.zipCode}
                    </Text>
                  )}
                </View>
                <View>
                  <Text className="text-lg mb-1">
                    Instruções de Entrega (Opcional)
                  </Text>

                  <TextInput
                    className="border rounded-md p-3 bg-white border-gray-300"
                    placeholder="Alguma instrução especial para a entrega?"
                    value={values.deliveryInstructions}
                    onChangeText={handleChange("deliveryInstructions")}
                    onBlur={handleBlur("deliveryInstructions")}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View className="flex-1 justify-end">
                  <TouchableOpacity
                    className={`mt-6 px-4 py-3 rounded-md bg-blue-500 ${
                      isSubmitting ? "bg-blue-300" : ""
                    }`}
                    onPress={() => handleSubmit()}
                    disabled={isSubmitting}
                  >
                    <Text className="text-white text-center text-lg font-semibold">
                      {isSubmitting
                        ? "Confirmando..."
                        : "Continuar para Pagamento"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}