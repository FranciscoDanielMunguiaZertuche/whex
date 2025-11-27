import { Text, View } from "react-native";
import { useTheme } from "@/lib/theme-context";

export default function Home() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Whex
      </Text>
      <Text
        style={{
          color: theme.colors.mutedForeground,
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
