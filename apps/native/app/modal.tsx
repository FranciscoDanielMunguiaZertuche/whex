import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/lib/theme-context";

export default function Modal() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
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
        <Text
          style={{
            color: theme.colors.foreground,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          New Task
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: theme.colors.info, fontSize: 16 }}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: theme.colors.mutedForeground,
          fontSize: 16,
          marginTop: 20,
        }}
      >
        Modal works!
      </Text>
    </View>
  );
}
