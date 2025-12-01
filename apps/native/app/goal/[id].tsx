import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  CheckCircle2,
  MoreHorizontal,
  Target,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/lib/theme-context";

const INITIAL_PROGRESS = 65;

export default function GoalDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();

  // Mock Data
  const [title, setTitle] = useState(`Launch Product V1 (ID: ${id})`);
  const [progress] = useState(INITIAL_PROGRESS);
  const [description, setDescription] = useState(
    "Release the MVP to the first 100 users and gather feedback."
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Goal Detail",
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
            <Target color={theme.colors.primary} size={20} />
            <Text className="font-medium text-primary text-sm">
              Active Goal
            </Text>
          </View>
          <Input
            className="h-auto border-none p-0 font-bold text-2xl"
            multiline
            onChangeText={setTitle}
            value={title}
          />
        </View>

        {/* Progress Section */}
        <View className="mb-8 rounded-xl border border-border bg-card p-4">
          <View className="mb-2 flex-row justify-between">
            <Text className="font-medium text-foreground">Progress</Text>
            <Text className="font-bold text-primary">{progress}%</Text>
          </View>
          <Progress className="h-2" value={progress} />
          <Text className="mt-2 text-muted-foreground text-xs">
            On track to complete by Dec 31
          </Text>
        </View>

        {/* Description / Why */}
        <View className="mb-8">
          <Text className="mb-2 font-bold text-foreground text-lg">
            Why this matters
          </Text>
          <Input
            className="h-auto border-none p-0 text-base text-muted-foreground"
            multiline
            onChangeText={setDescription}
            value={description}
          />
        </View>

        {/* Key Results / Milestones */}
        <View className="mb-8">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-bold text-foreground text-lg">
              Key Results
            </Text>
            <Button size="sm" variant="ghost">
              <Text>+ Add</Text>
            </Button>
          </View>

          <View className="gap-3">
            {[
              { id: 1, title: "Complete UI Design", completed: true },
              { id: 2, title: "Develop Backend API", completed: true },
              { id: 3, title: "User Testing", completed: false },
            ].map((kr) => (
              <View
                className="flex-row items-center gap-3 rounded-lg bg-secondary/30 p-3"
                key={kr.id}
              >
                <CheckCircle2
                  color={
                    kr.completed
                      ? theme.colors.primary
                      : theme.colors.mutedForeground
                  }
                  size={20}
                />
                <Text
                  className={
                    kr.completed
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  }
                >
                  {kr.title}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
