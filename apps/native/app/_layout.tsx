import { Slot } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider, useTheme } from "@/lib/theme-context";

const RootLayoutContent = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.headerText}>
          Theme works! Background: {theme.colors.background}
        </Text>
      </View>
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
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
