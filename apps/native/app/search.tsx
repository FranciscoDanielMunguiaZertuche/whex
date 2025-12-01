import { type Href, useRouter } from "expo-router";
import { ArrowLeft, Search as SearchIcon } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "@/components/ui/text";
import { useTheme } from "@/lib/theme-context";

// Mock Data
const MOCK_RESULTS = {
  tasks: [
    { id: "1", title: "Review Q1 Goals", type: "Task" },
    { id: "2", title: "Prepare Board Meeting Slides", type: "Task" },
    { id: "3", title: "Email Marketing Campaign", type: "Task" },
  ],
  notes: [
    { id: "1", title: "Meeting Notes: Q1 Review", type: "Note" },
    { id: "2", title: "Idea for new feature", type: "Note" },
  ],
  projects: [
    { id: "1", title: "Website Redesign", type: "Project" },
    { id: "2", title: "Mobile App Launch", type: "Project" },
  ],
  goals: [
    { id: "1", title: "Increase ARR by 20%", type: "Goal" },
    { id: "2", title: "Hire 3 Engineers", type: "Goal" },
  ],
};

export default function SearchScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [query, setQuery] = useState("");

  const hasResults = query.length > 0;

  const filteredResults = hasResults
    ? {
        tasks: MOCK_RESULTS.tasks.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        ),
        notes: MOCK_RESULTS.notes.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        ),
        projects: MOCK_RESULTS.projects.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        ),
        goals: MOCK_RESULTS.goals.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        ),
      }
    : MOCK_RESULTS;

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center gap-3 border-border border-b px-4 pt-2 pb-4">
        <TouchableOpacity
          className="rounded-full p-2 active:bg-secondary"
          onPress={() => router.back()}
        >
          <ArrowLeft color={theme.colors.foreground} size={24} />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center rounded-lg bg-secondary/50 px-3 py-2">
          <SearchIcon color={theme.colors.mutedForeground} size={20} />
          <TextInput
            autoFocus
            className="ml-2 flex-1 text-base text-foreground"
            onChangeText={setQuery}
            placeholder="Search tasks, notes, projects..."
            placeholderTextColor={theme.colors.mutedForeground}
            value={query}
          />
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {hasResults ? (
          <View className="gap-6 pb-10">
            {/* Tasks */}
            {filteredResults.tasks.length > 0 && (
              <View>
                <Text className="mb-2 font-medium text-muted-foreground text-sm">
                  TASKS
                </Text>
                <View className="gap-2">
                  {filteredResults.tasks.map((item) => (
                    <TouchableOpacity
                      className="flex-row items-center justify-between rounded-lg border border-border bg-card p-3 active:bg-secondary/50"
                      key={item.id}
                      onPress={() => router.push("/(tabs)/tasks")}
                    >
                      <Text className="font-medium text-foreground">
                        {item.title}
                      </Text>
                      <Text className="text-muted-foreground text-xs">
                        {item.type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Projects */}
            {filteredResults.projects.length > 0 && (
              <View>
                <Text className="mb-2 font-medium text-muted-foreground text-sm">
                  PROJECTS
                </Text>
                <View className="gap-2">
                  {filteredResults.projects.map((item) => (
                    <TouchableOpacity
                      className="flex-row items-center justify-between rounded-lg border border-border bg-card p-3 active:bg-secondary/50"
                      key={item.id}
                      onPress={() =>
                        router.push({
                          pathname: "/project/[id]",
                          params: { id: item.id },
                        } as unknown as Href)
                      }
                    >
                      <Text className="font-medium text-foreground">
                        {item.title}
                      </Text>
                      <Text className="text-muted-foreground text-xs">
                        {item.type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Goals */}
            {filteredResults.goals.length > 0 && (
              <View>
                <Text className="mb-2 font-medium text-muted-foreground text-sm">
                  GOALS
                </Text>
                <View className="gap-2">
                  {filteredResults.goals.map((item) => (
                    <TouchableOpacity
                      className="flex-row items-center justify-between rounded-lg border border-border bg-card p-3 active:bg-secondary/50"
                      key={item.id}
                      onPress={() =>
                        router.push({
                          pathname: "/goal/[id]",
                          params: { id: item.id },
                        } as unknown as Href)
                      }
                    >
                      <Text className="font-medium text-foreground">
                        {item.title}
                      </Text>
                      <Text className="text-muted-foreground text-xs">
                        {item.type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Notes */}
            {filteredResults.notes.length > 0 && (
              <View>
                <Text className="mb-2 font-medium text-muted-foreground text-sm">
                  NOTES
                </Text>
                <View className="gap-2">
                  {filteredResults.notes.map((item) => (
                    <TouchableOpacity
                      className="flex-row items-center justify-between rounded-lg border border-border bg-card p-3 active:bg-secondary/50"
                      key={item.id}
                      onPress={() => router.push("/(tabs)/notes")}
                    >
                      <Text className="font-medium text-foreground">
                        {item.title}
                      </Text>
                      <Text className="text-muted-foreground text-xs">
                        {item.type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        ) : (
          <View className="mt-10 items-center justify-center">
            <SearchIcon color={theme.colors.muted} size={48} />
            <Text className="mt-4 text-center text-muted-foreground">
              Type to search across your workspace
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
