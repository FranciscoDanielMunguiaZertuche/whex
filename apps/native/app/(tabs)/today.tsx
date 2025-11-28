import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Check,
  ChevronDown,
  Columns,
  Flag,
  List,
  Menu,
  Plus,
  Sparkles,
} from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useDrawer } from "@/lib/drawer-context";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";

export default function Today() {
  const { theme } = useTheme();
  const { openDrawer } = useDrawer();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<"list" | "board">("list");

  // Fetch tasks
  const {
    data: tasks,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(trpc.task.listToday.queryOptions());

  // Toggle complete mutation
  const toggleCompleteMutation = useMutation(
    trpc.task.toggleComplete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["task", "listToday"]] });
      },
    })
  );

  const handleToggleComplete = useCallback(
    (id: string, isCompleted: boolean) => {
      toggleCompleteMutation.mutate({ id, isCompleted });
    },
    [toggleCompleteMutation]
  );

  // Separate priorities from other tasks
  const { allTasks, completedCount, totalCount } = useMemo(() => {
    if (!tasks) {
      return { allTasks: [], completedCount: 0, totalCount: 0 };
    }

    const completed = tasks.filter((t) => t.status === "completed");
    const incomplete = tasks.filter((t) => t.status !== "completed");

    return {
      allTasks: [...incomplete, ...completed],
      completedCount: completed.length,
      totalCount: tasks.length,
    };
  }, [tasks]);

  const renderTaskItem = ({
    item,
  }: {
    item: NonNullable<typeof tasks>[number];
  }) => {
    const isCompleted = item.status === "completed";

    return (
      <TouchableOpacity
        className="mb-3 flex-row items-center justify-between rounded-2xl border border-border/30 bg-card/50 p-4"
        onPress={() => handleToggleComplete(item.id, !isCompleted)}
      >
        <View className="flex-1 flex-row items-start gap-4">
          <View className="mt-1">
            {isCompleted ? (
              <View className="h-5 w-5 items-center justify-center rounded-full border border-muted-foreground bg-muted-foreground/20">
                <Check color={theme.colors.mutedForeground} size={12} />
              </View>
            ) : (
              <View className="h-5 w-5 rounded-full border border-muted-foreground/50" />
            )}
          </View>

          <View className="flex-1">
            <Text
              className={cn(
                "mb-1 font-medium text-base",
                isCompleted && "text-muted-foreground line-through"
              )}
            >
              {item.title}
            </Text>
            <View className="flex-row items-center gap-2">
              <Calendar color={theme.colors.mutedForeground} size={12} />
              <Text className="text-muted-foreground text-xs">today</Text>
              <Text className="text-muted-foreground text-xs">•</Text>
              <Text className="font-medium text-primary text-xs">
                {item.projectName || "Inbox"}
              </Text>
            </View>
          </View>
        </View>

        <View className="ml-2">
          <Flag
            color={
              item.isPriority
                ? theme.colors.warning
                : theme.colors.mutedForeground
            }
            fill={item.isPriority ? theme.colors.warning : "transparent"}
            size={16}
          />
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Text className="mb-2 text-center font-semibold text-foreground text-lg">
          Unable to load tasks
        </Text>
        <Text className="mb-4 text-center text-muted-foreground text-sm">
          {error?.message || "Something went wrong. Please try again."}
        </Text>
        <Button onPress={() => refetch()} variant="outline">
          <Text>Try Again</Text>
        </Button>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-2">
        <Button onPress={openDrawer} size="icon" variant="ghost">
          <Menu color={theme.colors.foreground} size={24} />
        </Button>
        <Text className="font-semibold text-lg">Tasks</Text>
        <Button size="icon" variant="ghost">
          <Plus color={theme.colors.foreground} size={24} />
        </Button>
      </View>

      {/* Breadcrumb & Filter */}
      <View className="px-4 py-4">
        <View className="mb-6 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View className="rounded-md bg-secondary/30 px-2 py-1">
              <Text className="font-bold text-muted-foreground text-xs uppercase tracking-wider">
                VECTAL
              </Text>
            </View>
            <Text className="text-lg text-muted-foreground">/</Text>
            <Text className="font-bold text-foreground text-xl">all tasks</Text>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="rounded-full bg-secondary/30 px-3 py-1">
              <Text className="font-medium text-muted-foreground text-xs">
                {completedCount}/{totalCount}
              </Text>
            </View>
            <ChevronDown color={theme.colors.mutedForeground} size={16} />
          </View>
        </View>

        {/* Toolbar */}
        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center gap-1 rounded-lg border border-border/30 bg-secondary/20 p-1">
            <TouchableOpacity
              className={cn(
                "rounded-md p-2",
                viewMode === "list" ? "bg-primary/20" : "bg-transparent"
              )}
              onPress={() => setViewMode("list")}
            >
              <List
                color={
                  viewMode === "list"
                    ? theme.colors.primary
                    : theme.colors.mutedForeground
                }
                size={18}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className={cn(
                "rounded-md p-2",
                viewMode === "board" ? "bg-primary/20" : "bg-transparent"
              )}
              onPress={() => setViewMode("board")}
            >
              <Columns
                color={
                  viewMode === "board"
                    ? theme.colors.primary
                    : theme.colors.mutedForeground
                }
                size={18}
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center gap-2">
            <Text className="text-muted-foreground text-sm">Priority</Text>
            <ChevronDown color={theme.colors.mutedForeground} size={14} />
          </View>

          <TouchableOpacity className="flex-row items-center gap-2 rounded-full bg-foreground px-3 py-2">
            <Sparkles
              color={theme.colors.background}
              fill={theme.colors.background}
              size={14}
            />
            <Text className="font-bold text-background text-xs">
              AI Toolkit
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Task List */}
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        data={allTasks}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <View className="mt-8 items-center">
            <Text className="text-muted-foreground text-sm">
              completed tasks
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={isLoading}
            tintColor={theme.colors.primary}
          />
        }
        renderItem={renderTaskItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
