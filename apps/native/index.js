// SIDELOAD DEBUG: Ultra-minimal entry point
// This bypasses expo-router entirely to test if basic React Native works

import { Alert, AppRegistry, Text, View } from "react-native";

// Show alert immediately to confirm JS is executing
Alert.alert("JS Started", "JavaScript is running!");

const App = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ color: "white", fontSize: 32, fontWeight: "bold" }}>
      SIDELOAD TEST
    </Text>
    <Text style={{ color: "white", fontSize: 16, marginTop: 20 }}>
      If you see this, React Native works!
    </Text>
  </View>
);

// Register directly - bypassing expo-router
AppRegistry.registerComponent("main", () => App);
