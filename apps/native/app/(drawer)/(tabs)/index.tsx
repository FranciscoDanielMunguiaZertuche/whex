import { Text, View } from "react-native";
import { useTheme } from "@/lib/theme-context";

export default function Home() {
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
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Today
      </Text>
      <Text
        style={{
          color: theme.colors.mutedForeground,
          fontSize: 16,
          marginTop: 8,
        }}
      >
        Tabs navigation works!
      </Text>
    </View>
  );
}
