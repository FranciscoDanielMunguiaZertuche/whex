// Placeholder for create tab - this screen is never shown
// The tab press is intercepted to open the modal instead
import { Text, View } from "react-native";
import { useTheme } from "@/lib/theme-context";

export default function CreatePlaceholder() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: theme.colors.mutedForeground }}>
        Redirecting to modal...
      </Text>
    </View>
  );
}
