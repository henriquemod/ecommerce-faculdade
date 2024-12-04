import { useAuthStore } from "@/store/user";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Formik, FormikHelpers } from "formik";
import React, { useMemo } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

interface ProfileFormValues {
  username: string;
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  avatar?: string;
  number: string;
}

const ProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username muito curto!")
    .required("Username é obrigatório"),
  email: Yup.string().email("Invalid email").required("Email é obrigatório"),
  phone: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Número de telefone inválido")
    .required("Número de telefone é obrigatório"),
  firstName: Yup.string().optional(),
  lastName: Yup.string().optional(),
  street: Yup.string().required("Rua é obrigatória"),
  city: Yup.string().required("Cidade é obrigatória"),
  state: Yup.string().required("Estado é obrigatório"),
  zipCode: Yup.string().required("CEP é obrigatório"),
  number: Yup.string().required("Número é obrigatório"),
  avatar: Yup.string().optional(),
});

export default function ProfileSettingsScreen(): JSX.Element {
  const router = useRouter();
  const { user, setUser, clearAuth } = useAuthStore();

  const initialValues: ProfileFormValues = useMemo(
    () => ({
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      street: user?.address.street || "",
      city: user?.address.city || "",
      state: user?.address.state || "",
      zipCode: user?.address.zipCode || "",
      avatar: user?.avatar || "",
      number: user?.address.number || "",
    }),
    [user]
  );

  const handleUpdateProfile = async (
    values: ProfileFormValues,
    { setSubmitting }: FormikHelpers<ProfileFormValues>
  ): Promise<void> => {
    try {
      console.log({ values });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedUser = {
        ...user!,
        username: values.username,
        email: values.email,
        phone: values.phone,
        firstName: values.firstName,
        lastName: values.lastName,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
          number: values.number,
        },
        avatar: values.avatar, // Now correctly updated
      };

      await setUser(updatedUser);

      Toast.show({
        type: "success",
        text1: "Perfil Atualizado",
        text2: "Seu perfil foi atualizado com sucesso.",
        position: "top",
        topOffset: 100,
        visibilityTime: 4000,
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Atualização de Perfil Falhou",
        text2: "Tivemos um problema ao atualizar seu perfil.",
        position: "top",
        topOffset: 100,
        visibilityTime: 4000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="relative p-4 flex justify-center items-center flex-row">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-4"
          >
            <Text>Voltar</Text>
          </TouchableOpacity>
          <Text className="text-3xl font-bold">Perfil</Text>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={handleUpdateProfile}
          enableReinitialize
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue, // Destructure setFieldValue
          }) => {
            const pickImage = async () => {
              try {
                const { status } =
                  await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                  Toast.show({
                    type: "error",
                    text1: "Permissão Necessária",
                    text2: "Precisamos de permissão para acessar a galeria.",
                    position: "top",
                    topOffset: 100,
                    visibilityTime: 4000,
                  });
                  return;
                }

                const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 0.5,
                });

                if (!result.canceled) {
                  const uri = result.assets[0].uri;
                  console.log({ uri });

                  // Update Formik's avatar value
                  setFieldValue("avatar", uri);

                  // Update the user store
                  setUser({ ...user!, avatar: uri });
                }
              } catch (error) {
                console.error(error);
                Toast.show({
                  type: "error",
                  text1: "Seleção de Imagem Falhou",
                  text2: "Tivemos um problema ao selecionar sua imagem.",
                  position: "top",
                  topOffset: 100,
                  visibilityTime: 4000,
                });
              }
            };

            return (
              <View className="space-y-4">
                {/* Avatar Section */}
                <View className="items-center mb-6">
                  {values.avatar ? ( // Use Formik's values.avatar
                    <View className="w-48 h-48 rounded-full flex justify-center items-center relative overflow-visible">
                      <Image
                        source={{ uri: values.avatar }}
                        className="w-48 h-48 rounded-full border-2 border-zinc-300"
                        resizeMode="cover" // Changed to 'cover' for better image display
                      />
                      <TouchableOpacity
                        onPress={pickImage}
                        className="absolute right-0 bottom-0 rounded-full w-12 h-12 bg-yellow-700 flex justify-center items-center shadow-2xl"
                      >
                        <Ionicons
                          name="refresh"
                          size={24}
                          color="white"
                          className="mb-0.5"
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={pickImage}>
                      <View className="w-48 h-48 rounded-full bg-gray-300 items-center justify-center border-2 border-dashed flex gap-2 relative">
                        <Ionicons name="camera" size={28} color="gray" />
                        <Text className="text-gray-600">Adicionar avatar</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Username */}
                <View>
                  <Text className="text-lg mb-1">Usuário</Text>
                  <TextInput
                    className={`border rounded-md p-3 bg-white ${
                      touched.username && errors.username
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Username"
                    value={values.username}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    autoCapitalize="none"
                  />
                  {touched.username && errors.username && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.username}
                    </Text>
                  )}
                </View>

                {/* Email */}
                <View>
                  <Text className="text-lg mb-1">Email</Text>
                  <TextInput
                    className={`border rounded-md p-3 bg-white ${
                      touched.email && errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </Text>
                  )}
                </View>

                {/* Phone */}
                <View>
                  <Text className="text-lg mb-1">Telefone</Text>
                  <TextInput
                    className={`border rounded-md p-3 bg-white ${
                      touched.phone && errors.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Phone"
                    value={values.phone}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    keyboardType="phone-pad"
                  />
                  {touched.phone && errors.phone && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.phone}
                    </Text>
                  )}
                </View>

                {/* First Name */}
                <View>
                  <Text className="text-lg mb-1">Nome (Optional)</Text>
                  <TextInput
                    className="border rounded-md p-3 bg-white border-gray-300"
                    placeholder="First Name"
                    value={values.firstName}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                  />
                </View>

                {/* Last Name */}
                <View>
                  <Text className="text-lg mb-1">Sobrenome (Optional)</Text>
                  <TextInput
                    className="border rounded-md p-3 bg-white border-gray-300"
                    placeholder="Last Name"
                    value={values.lastName}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                  />
                </View>

                {/* Address Section */}
                <Text className="text-2xl font-semibold mt-6 mb-4">
                  Endereço
                </Text>

                {/* Street */}
                <View>
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

                {/* Number */}
                <View>
                  <Text className="text-lg mb-1">Número</Text>
                  <TextInput
                    className={`border rounded-md p-3 bg-white ${
                      touched.number && errors.number
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Number"
                    value={values.number}
                    onChangeText={handleChange("number")}
                    onBlur={handleBlur("number")}
                    keyboardType="numeric"
                  />
                  {touched.number && errors.number && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.number}
                    </Text>
                  )}
                </View>

                {/* City */}
                <View>
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

                {/* State */}
                <View>
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

                {/* ZIP Code */}
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

                {/* Submit Button */}
                <TouchableOpacity
                  className={`mt-6 px-4 py-3 rounded-md ${
                    isSubmitting ? "bg-green-300" : "bg-green-500"
                  }`}
                  onPress={handleSubmit as any}
                  disabled={isSubmitting}
                >
                  <Text className="text-white text-center text-lg font-semibold">
                    {isSubmitting ? "Atualizando..." : "Atualizar perfil"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}
