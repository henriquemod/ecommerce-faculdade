import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="product/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="purchase/[id]/confirm-address-screen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="purchase/[id]/payment-screen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="auth/login/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/profile/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
