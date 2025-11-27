import { Text, View } from "react-native";
import { useTheme } from "@/lib/theme-context";

export default function TabTwo() {
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
        Calendar
      </Text>
      <Text
        style={{
          color: theme.colors.mutedForeground,
          fontSize: 16,
          marginTop: 8,
        }}
      >
        Calendar screen works!
      </Text>
    </View>
  );
}
