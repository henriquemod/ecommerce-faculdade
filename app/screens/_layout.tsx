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
    </Stack>
  );
}
