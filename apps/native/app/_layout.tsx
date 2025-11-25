import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import type { ErrorInfo, ReactNode } from "react";
import { Component, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useUnistyles } from "react-native-unistyles";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/utils/trpc";

// Error boundary to catch JS errors and show them instead of white screen
const ERROR_STACK_MAX_LENGTH = 500;

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // Error logged for debugging
    // Force hide splash screen so error is visible
    hideAsync().catch(() => {
      /* ignore */
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ color: "red", fontSize: 18, marginBottom: 10 }}>
            App Error
          </Text>
          <Text style={{ color: "#333", fontSize: 14, textAlign: "center" }}>
            {this.state.error?.message ?? "Unknown error"}
          </Text>
          <Text
            style={{
              color: "#666",
              fontSize: 12,
              marginTop: 10,
              textAlign: "center",
            }}
          >
            {this.state.error?.stack?.substring(0, ERROR_STACK_MAX_LENGTH)}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

// Keep the splash screen visible while we fetch resources
preventAutoHideAsync().catch(() => {
  /* Splash screen already hidden or not available */
});

const SPLASH_TIMEOUT_MS = 3000; // Reduced to 3s for better UX

export const unstable_settings = {
  initialRouteName: "(drawer)",
};

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <RootLayoutContent />
    </ErrorBoundary>
  );
}

function RootLayoutContent() {
  const { theme } = useUnistyles();
  const { data: session, isPending, error } = authClient.useSession();
  const segments = useSegments();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const splashHidden = useRef(false);

  // Fallback colors in case theme isn't ready
  const backgroundColor = theme?.colors?.background ?? "#ffffff";
  const primaryColor = theme?.colors?.primary ?? "#000000";
  const foregroundColor = theme?.colors?.foreground ?? "#000000";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Force hide splash screen after timeout, regardless of auth state
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!splashHidden.current) {
        splashHidden.current = true;
        setTimedOut(true);
        hideAsync().catch(() => {
          /* ignore */
        });
      }
    }, SPLASH_TIMEOUT_MS);

    return () => clearTimeout(timeout);
  }, []);

  // Hide splash screen once session state is resolved
  useEffect(() => {
    if (splashHidden.current) {
      return;
    }

    // Hide immediately if not pending (success or error)
    if (!isPending) {
      splashHidden.current = true;
      hideAsync().catch(() => {
        /* ignore */
      });
    }
  }, [isPending]);

  useEffect(() => {
    // Allow navigation once mounted AND (auth resolved OR timed out)
    if (!isMounted || (isPending && !timedOut)) {
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";

    // If timed out or error, redirect to sign-in
    if (timedOut || error || !(session || inAuthGroup)) {
      // Redirect to the sign-in page.
      router.replace("/(auth)/sign-in");
    } else if (session && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/(drawer)/(tabs)");
    }
  }, [session, segments, isPending, isMounted, router, timedOut, error]);

  // Show loading state only briefly - will timeout after 3s
  if (isPending && !timedOut) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor,
        }}
      >
        <ActivityIndicator color={primaryColor} size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor,
            },
            headerTitleStyle: {
              color: foregroundColor,
            },
            headerTintColor: foregroundColor,
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
