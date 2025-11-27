import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Modal() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1a1a1a",
        padding: 20,
        paddingTop: 60,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          New Task
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: "#0066ff", fontSize: 16 }}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ color: "#888", fontSize: 16, marginTop: 20 }}>
        Modal works!
      </Text>
    </View>
  );
}
