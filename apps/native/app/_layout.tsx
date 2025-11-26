import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { useEffect } from "react";
import { Text, View } from "react-native";

// MINIMAL TEST: Remove ALL dependencies and just render a simple view
// This will help us determine if the issue is with a specific library

const SPLASH_HIDE_DELAY_MS = 1000;

// Immediately try to hide splash screen
preventAutoHideAsync().catch(() => {
  /* splash screen not available */
});

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after delay no matter what
    const timer = setTimeout(() => {
      hideAsync().catch(() => {
        /* ignore */
      });
    }, SPLASH_HIDE_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 24, color: "#000" }}>App is running!</Text>
      <Text style={{ fontSize: 14, color: "#666", marginTop: 10 }}>
        If you see this, JS works.
      </Text>
    </View>
  );
}
