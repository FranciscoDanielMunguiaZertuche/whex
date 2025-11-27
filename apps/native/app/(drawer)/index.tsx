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
        Whex
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
    </View>
  );
}
