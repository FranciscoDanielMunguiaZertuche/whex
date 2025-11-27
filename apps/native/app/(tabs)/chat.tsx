import { ScrollView, Text, View } from "react-native";

export default function Chat() {
  return (
    <View className="flex-1 bg-background">
      <View className="px-5 pt-[60px] pb-4">
        <Text className="font-bold text-[28px] text-foreground">Chat</Text>
      </View>
      <ScrollView className="flex-1 p-5">
        <View className="rounded-xl border border-border bg-card p-5">
          <Text className="mb-2 font-semibold text-foreground text-lg">
            👋 Welcome to Whex
          </Text>
          <Text className="text-base text-muted-foreground leading-6">
            I'm your AI productivity companion. What's the first thing on your
            mind?
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
