import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ThemeProvider, useTheme } from "@/lib/theme-context";

const RootLayoutContent = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Slot />
    </View>
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
