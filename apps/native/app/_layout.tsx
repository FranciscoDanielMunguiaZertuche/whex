import { useEffect } from "react";
import { Alert, Text, View } from "react-native";

// ULTRA MINIMAL TEST - No expo-splash-screen at all
// This bypasses all native module dependencies

export default function RootLayout() {
  useEffect(() => {
    // This should show immediately if JS is running
    Alert.alert("JS Running", "JavaScript is executing!");
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ff0000",
      }}
    >
      <Text style={{ fontSize: 32, color: "#fff", fontWeight: "bold" }}>
        APP RUNNING
      </Text>
      <Text style={{ fontSize: 18, color: "#fff", marginTop: 20 }}>
        If you see RED background, JS works!
      </Text>
    </View>
  );
}
