import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-background p-5 pt-16">
      <Text className="font-bold text-3xl text-foreground">Profile</Text>
      <Text className="mt-2 text-base text-muted-foreground">
        Profile screen works!
      </Text>
    </View>
  );
}
