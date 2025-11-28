import "../global.css";

import { PortalHost } from "@rn-primitives/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider, useTheme } from "@/lib/theme-context";
import { queryClient } from "@/utils/trpc";

const RootLayoutContent = () => {
  const { isDark } = useTheme();

  return (
    <View className={`flex-1 bg-background ${isDark ? "dark" : ""}`}>
      <Slot />
      <PortalHost />
    </View>
  );
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RootLayoutContent />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
