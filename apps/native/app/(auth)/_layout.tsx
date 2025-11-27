import { Stack } from "expo-router";
import { useTheme } from "@/lib/theme-context";

export default function AuthLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTitleStyle: {
          color: theme.colors.foreground,
        },
        headerTintColor: theme.colors.foreground,
        contentStyle: {
          backgroundColor: theme.colors.background,
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
