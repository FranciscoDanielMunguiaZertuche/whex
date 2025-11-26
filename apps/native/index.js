// SIDELOAD DEBUG MODE
// This is an ultra-minimal entry point that bypasses ALL third-party native modules
// to test if the basic React Native runtime works on sideloaded apps

console.log("[WHEX] index.js starting - SIDELOAD DEBUG MODE");

import { AppRegistry, Text, View } from "react-native";

// Minimal app component with zero dependencies
const MinimalApp = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ff0000",
    }}
  >
    <Text style={{ fontSize: 32, color: "#fff", fontWeight: "bold" }}>
      SIDELOAD WORKS!
    </Text>
    <Text style={{ fontSize: 16, color: "#fff", marginTop: 20 }}>
      React Native is running successfully.
    </Text>
    <Text style={{ fontSize: 14, color: "#ffcccc", marginTop: 10 }}>
      No native modules loaded.
    </Text>
  </View>
);

// Register the app directly, bypassing expo-router
AppRegistry.registerComponent("main", () => MinimalApp);

console.log("[WHEX] App registered successfully");
