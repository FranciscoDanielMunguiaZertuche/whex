// Placeholder for create tab - this screen is never shown
// The tab press is intercepted to open the modal instead
import { Text, View } from "react-native";

export default function CreatePlaceholder() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-muted-foreground">Redirecting to modal...</Text>
    </View>
  );
}
