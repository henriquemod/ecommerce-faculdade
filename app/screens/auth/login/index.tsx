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

  const handleLogin = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ): Promise<void> => {
    try {
      // Handle login logic here
      if (values.username === "usuario" && values.password === "senha") {
        setToken("valid-token");
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4 justify-center items-center gap-8">
        <Image
          source={AppLogo}
          style={{
            width: 260,
            height: 260,
          }}
        />
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
                    className="border border-zinc-300 rounded-md p-4 text-lg"
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
                    className="border border-zinc-300 rounded-md p-4 text-lg"
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
                  className="bg-blue-500 p-4 rounded-md mt-4"
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                  testID="login-button"
                >
                  <Text className="text-white text-center text-xl font-bold">
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-zinc-700 p-4 rounded-md mt-4"
                  onPress={() => {
                    if (route.canGoBack() && !redirect) {
                      route.back();
                    } else {
                      route.navigate(redirect as any);
                    }
                  }}
                  disabled={isSubmitting}
                  testID="login-button"
                >
                  <Text className="text-white text-center text-xl font-bold">
                    Voltar
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
