// SIDELOAD DEBUG: Test without unistyles/tRPC
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1a1a1a",
        padding: 20,
        paddingTop: 60,
      }}
    >
      <Text style={{ color: "white", fontSize: 28, fontWeight: "bold" }}>
        Today
      </Text>
      <Text style={{ color: "#888", fontSize: 16, marginTop: 8 }}>
        Tabs navigation works!
      </Text>
    </View>
  );
}
