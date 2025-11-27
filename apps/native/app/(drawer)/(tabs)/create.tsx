// SIDELOAD DEBUG: Placeholder for create tab
// This screen is never shown - the tab press is intercepted to open the modal
import { Text, View } from "react-native";

export default function CreatePlaceholder() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1a1a1a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#888" }}>Redirecting to modal...</Text>
    </View>
  );
}
