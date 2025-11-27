// SIDELOAD DEBUG: Test unistyles initialization
// Step 3: Testing if react-native-unistyles causes the hang

import "../unistyles"; // Initialize unistyles FIRST

import { Slot } from "expo-router";
import { Text, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";

export default function RootLayout() {
  const { theme } = useUnistyles();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View
        style={{
          paddingTop: 60,
          paddingHorizontal: 20,
          backgroundColor: theme.colors.primary,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          Unistyles works! Theme: {theme.colors.background}
        </Text>
      </View>
      <Slot />
    </View>
  );
}
