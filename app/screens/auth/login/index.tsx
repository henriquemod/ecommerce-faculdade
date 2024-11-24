// screens/LoginScreen.tsx

import { useAuthStore } from "@/store/user";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { Formik, FormikHelpers } from "formik";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

import AppLogo from "../../../../assets/images/app_ecommerce_logo.png";
import { User } from "@/types/user";

interface LoginFormValues {
  username: string;
  password: string;
}

// Validation schema
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username too short!")
    .required("Username is required"),
  password: Yup.string()
    .min(5, "Password too short!")
    .required("Password is required"),
});

export default function LoginScreen(): JSX.Element {
  const { redirect } = useLocalSearchParams<{
    redirect?: string;
  }>();
  const route = useRouter();
  const setToken = useAuthStore((store) => store.setToken);
  const setUser = useAuthStore((store) => store.setUser);

  const handleLogin = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ): Promise<void> => {
    try {
      // Simulate API call to authenticate
      // Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (values.username === "usuario" && values.password === "senha") {
        const token = "valid-token";
        const user: User = {
          id: 1,
          username: "usuario",
          email: "usuario@example.com",
          phone: "+1234567890",
          firstName: "Usuario",
          lastName: "Test",
          address: {
            street: "123 Main St",
            city: "Cityville",
            state: "Stateburg",
            zipCode: "12345",
            number: "123",
          },
        };

        await setToken(token);
        await setUser(user);

        Toast.show({
          type: "success",
          text1: "Login realizado com sucesso",
          position: "top",
          topOffset: 100,
          visibilityTime: 4000,
        });

        if (route.canGoBack() && !redirect) {
          route.back();
        } else {
          route.navigate(redirect as any);
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Falha no login",
          text2: "Usuário ou senha inválidos",
          position: "top",
          topOffset: 100,
          visibilityTime: 4000,
        });
      }

      console.log("Login attempt:", values);
    } catch (error) {
      console.log(error as Error);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Ocorreu um erro durante o login",
        position: "top",
        topOffset: 100,
        visibilityTime: 4000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4 justify-center items-center gap-8">
        <Image source={AppLogo} className="w-64 h-64" resizeMode="contain" />
        <Text className="text-2xl font-bold mb-8 text-center">Login</Text>

        <Formik<LoginFormValues>
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => {
            return (
              <View className="w-full">
                <View className="mb-4">
                  <TextInput
                    className={`border border-zinc-300 rounded-md p-4 text-lg ${
                      touched.username && errors.username
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Username"
                    value={values.username}
                    onChangeText={handleChange("username")}
                    autoCapitalize="none"
                    testID="username-input"
                  />
                  {touched.username && errors.username && (
                    <Text className="text-sm text-red-500 mt-2">
                      {errors.username}
                    </Text>
                  )}
                </View>

                <View className="mb-4">
                  <TextInput
                    className={`border border-zinc-300 rounded-md p-4 text-lg ${
                      touched.password && errors.password
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    secureTextEntry
                    testID="password-input"
                  />
                  {touched.password && errors.password && (
                    <Text className="text-sm text-red-500 mt-2">
                      {errors.password}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  className={`bg-blue-500 p-4 rounded-md mt-4 ${
                    isSubmitting ? "bg-blue-300" : ""
                  }`}
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                  testID="login-button"
                >
                  <Text className="text-white text-center text-xl font-bold">
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
}
