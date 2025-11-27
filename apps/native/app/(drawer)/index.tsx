// SIDELOAD DEBUG: Test expo-router WITHOUT unistyles/tRPC
// Step 2: Testing if Drawer index screen works

import { Text, View } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0066ff",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ color: "white", fontSize: 28, fontWeight: "bold" }}>
        EXPO-ROUTER WORKS!
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 16,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        Drawer navigation is functional.
      </Text>
      <Text
        style={{ color: "white", fontSize: 14, marginTop: 10, opacity: 0.7 }}
      >
        No unistyles, no tRPC - just expo-router
      </Text>
    </View>
  );
}
