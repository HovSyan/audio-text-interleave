import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Back',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="player"
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#ddd",
          },
          headerLargeTitleShadowVisible: true,
        }}
      />
    </Stack>
  );
}
