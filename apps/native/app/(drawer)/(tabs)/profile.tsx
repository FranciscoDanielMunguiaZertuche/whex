import { Text, View } from "react-native";

export default function ProfileScreen() {
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
        Profile
      </Text>
      <Text style={{ color: "#888", fontSize: 16, marginTop: 8 }}>
        Profile screen works!
      </Text>
    </View>
  );
}
