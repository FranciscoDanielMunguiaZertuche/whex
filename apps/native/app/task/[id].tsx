import { Stack, useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  Check,
  Flag,
  MoreHorizontal,
  Tag,
  Target,
  Trash2,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/lib/theme-context";

export default function TaskDetailScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [title, setTitle] = useState("Finish Q3 Report"); // Mock data
  const [isComplete, setIsComplete] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Task Detail",
          headerLeft: () => (
            <TouchableOpacity className="mr-4" onPress={() => router.back()}>
              <ArrowLeft color={theme.colors.foreground} size={24} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View className="flex-row gap-4">
              <TouchableOpacity>
                <MoreHorizontal color={theme.colors.foreground} size={24} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsComplete(!isComplete)}>
                <Check
                  color={
                    isComplete ? theme.colors.primary : theme.colors.foreground
                  }
                  size={24}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <ScrollView className="flex-1 p-4">
        {/* Title Section */}
        <View className="mb-6 flex-row items-start gap-3">
          <Checkbox checked={isComplete} onCheckedChange={setIsComplete} />
          <Input
            className="h-auto flex-1 border-none p-0 font-semibold text-xl"
            multiline
            onChangeText={setTitle}
            value={title}
          />
        </View>

        {/* Metadata Section */}
        <View className="mb-8 gap-4">
          {/* Project */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Target color={theme.colors.mutedForeground} size={18} />
              <Text className="text-muted-foreground">Project</Text>
            </View>
            <Button size="sm" variant="outline">
              <Text>Work</Text>
            </Button>
          </View>

          {/* Due Date */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Calendar color={theme.colors.mutedForeground} size={18} />
              <Text className="text-muted-foreground">Due Date</Text>
            </View>
            <Button size="sm" variant="outline">
              <Text>Nov 5, 5:00 PM</Text>
            </Button>
          </View>

          {/* Priority */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Flag color={theme.colors.mutedForeground} size={18} />
              <Text className="text-muted-foreground">Priority</Text>
            </View>
            <Button size="sm" variant="outline">
              <Text>High</Text>
            </Button>
          </View>

          {/* Tags */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Tag color={theme.colors.mutedForeground} size={18} />
              <Text className="text-muted-foreground">Tags</Text>
            </View>
            <View className="flex-row gap-2">
              <Text className="text-primary">#quarterly</Text>
              <Text className="text-primary">#important</Text>
            </View>
          </View>
        </View>

        {/* Subtasks Section */}
        <View className="mb-8">
          <Text className="mb-4 font-semibold text-lg">Subtasks (3/5)</Text>
          <View className="gap-3">
            {/* Mock Subtasks */}
            <View className="flex-row items-center gap-3">
              <Checkbox checked={true} onCheckedChange={() => null} />
              <Text className="text-muted-foreground line-through">
                Gather data
              </Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Checkbox checked={true} onCheckedChange={() => null} />
              <Text className="text-muted-foreground line-through">
                Create charts
              </Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Checkbox checked={false} onCheckedChange={() => null} />
              <Text>Get CFO approval</Text>
            </View>
            <Button className="justify-start px-0" variant="ghost">
              <Text className="text-primary">+ Add Subtask</Text>
            </Button>
          </View>
        </View>

        {/* Notes Section */}
        <View className="mb-8">
          <Text className="mb-4 font-semibold text-lg">Notes</Text>
          <View className="min-h-[100px] rounded-lg bg-secondary/20 p-4">
            <Text>Key points to include:</Text>
            <Text>- Revenue up 15% QoQ</Text>
            <Text>- New client acquisitions...</Text>
          </View>
        </View>

        {/* Actions */}
        <View className="mb-8 gap-4">
          <Button className="w-full flex-row gap-2">
            <Target color="white" size={18} />
            <Text className="text-white">Start Focus Session</Text>
          </Button>

          <Button className="w-full flex-row gap-2" variant="destructive">
            <Trash2 color="white" size={18} />
            <Text className="text-white">Delete Task</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
