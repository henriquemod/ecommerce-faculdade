import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="profile/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="purchase/history/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="purchase/details/[id]/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
