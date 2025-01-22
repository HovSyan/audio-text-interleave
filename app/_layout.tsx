import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#eee",
          },
          headerLargeTitleShadowVisible: true,
        }}
      />
    </Stack>
  );
}
