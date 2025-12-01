import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Folder, MoreHorizontal } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwipeableTaskCard } from "@/components/swipeable-task-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/lib/theme-context";

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();

  // Mock Data
  const [title, setTitle] = useState(`Marketing Campaign (ID: ${id})`);
  const [description, setDescription] = useState(
    "Q3 Marketing push for the new product launch."
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Project Detail",
          headerLeft: () => (
            <TouchableOpacity className="mr-4" onPress={() => router.back()}>
              <ArrowLeft color={theme.colors.foreground} size={24} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <MoreHorizontal color={theme.colors.foreground} size={24} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="mb-6">
          <View className="mb-2 flex-row items-center gap-2">
            <Folder color={theme.colors.primary} size={20} />
            <Text className="font-medium text-primary text-sm">
              Active Project
            </Text>
          </View>
          <Input
            className="h-auto border-none p-0 font-bold text-2xl"
            multiline
            onChangeText={setTitle}
            value={title}
          />
          <Input
            className="mt-2 h-auto border-none p-0 text-base text-muted-foreground"
            multiline
            onChangeText={setDescription}
            value={description}
          />
        </View>

        {/* Tasks Section */}
        <View className="mb-8">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-bold text-foreground text-lg">Tasks</Text>
            <Button size="sm" variant="ghost">
              <Text>+ Add Task</Text>
            </Button>
          </View>

          <View>
            {/* Mock Tasks */}
            <SwipeableTaskCard
              id="1"
              isCompleted={false}
              isPriority={true}
              onDelete={() => null}
              onPress={() => null}
              onToggleComplete={() => null}
              title="Draft social media posts"
            />
            <SwipeableTaskCard
              id="2"
              isCompleted={true}
              isPriority={false}
              onDelete={() => null}
              onPress={() => null}
              onToggleComplete={() => null}
              title="Review ad creatives"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
