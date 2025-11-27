// SIDELOAD DEBUG: Test expo-router with Slot
// Step 2: Testing if expo-router navigation works

import { Slot } from "expo-router";
import { Text, View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#00ff00" }}>
      <View
        style={{
          paddingTop: 60,
          paddingHorizontal: 20,
          backgroundColor: "#007700",
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          expo-router is working!
        </Text>
      </View>
      <Slot />
    </View>
  );
}
