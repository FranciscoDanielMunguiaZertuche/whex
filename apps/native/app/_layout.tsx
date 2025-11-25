import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useUnistyles } from "react-native-unistyles";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/utils/trpc";

// Keep the splash screen visible while we fetch resources
preventAutoHideAsync();

const SPLASH_TIMEOUT_MS = 5000;

export const unstable_settings = {
  initialRouteName: "(drawer)",
};

export default function RootLayout() {
  const { theme } = useUnistyles();
  const { data: session, isPending } = authClient.useSession();
  const segments = useSegments();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const splashHidden = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Hide splash screen once session state is resolved OR after timeout
  useEffect(() => {
    if (splashHidden.current) {
      return;
    }

    // Hide immediately if not pending
    if (!isPending) {
      splashHidden.current = true;
      hideAsync();
      return;
    }

    // Fallback: hide splash after timeout even if still pending
    const timeout = setTimeout(() => {
      if (!splashHidden.current) {
        splashHidden.current = true;
        hideAsync();
      }
    }, SPLASH_TIMEOUT_MS);

    return () => clearTimeout(timeout);
  }, [isPending]);

  useEffect(() => {
    if (!isMounted || isPending) {
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";

    if (!(session || inAuthGroup)) {
      // Redirect to the sign-in page.
      router.replace("/(auth)/sign-in");
    } else if (session && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/(drawer)/(tabs)");
    }
  }, [session, segments, isPending, isMounted, router]);

  if (isPending) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTitleStyle: {
              color: theme.colors.foreground,
            },
            headerTintColor: theme.colors.foreground,
          }}
        >
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ title: "Modal", presentation: "modal" }}
          />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
