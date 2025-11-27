// SIDELOAD DEBUG: Test without unistyles
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1a1a1a",
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
        headerTintColor: "#ffffff",
        contentStyle: {
          backgroundColor: "#1a1a1a",
        },
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{ title: "Sign In", headerShown: false }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ title: "Sign Up", headerShown: false }}
      />
    </Stack>
  );
}
