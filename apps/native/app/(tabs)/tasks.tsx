import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Check,
  ChevronDown,
  Columns,
  Flag,
  List,
  Plus,
  Sparkles,
} from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "@/components/ui/menu-icon";
import { Text } from "@/components/ui/text";
import { useDrawer } from "@/lib/drawer-context";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";

// Mock data for when user is not logged in
const MOCK_TASKS = [
  {
    id: "1",
    title: "Review product roadmap for Q1",
    status: "pending" as const,
    isPriority: true,
    projectName: "Product",
  },
  {
    id: "2",
    title: "Prepare investor pitch deck",
    status: "pending" as const,
    isPriority: true,
    projectName: "Fundraising",
  },
  {
    id: "3",
    title: "Schedule 1:1 with design team",
    status: "pending" as const,
    isPriority: false,
    projectName: "Team",
  },
  {
    id: "4",
    title: "Finalize budget proposal",
    status: "pending" as const,
    isPriority: true,
    projectName: "Finance",
  },
  {
    id: "5",
    title: "Review and respond to partner emails",
    status: "pending" as const,
    isPriority: false,
    projectName: "Inbox",
  },
  {
    id: "6",
    title: "Update project documentation",
    status: "completed" as const,
    isPriority: false,
    projectName: "Engineering",
  },
  {
    id: "7",
    title: "Send weekly team update",
    status: "completed" as const,
    isPriority: false,
    projectName: "Team",
  },
];

type Task = (typeof MOCK_TASKS)[number];

export default function Today() {
  const { theme } = useTheme();
  const { openDrawer } = useDrawer();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [mockTasks, setMockTasks] = useState<Task[]>(MOCK_TASKS);

  // Fetch tasks - will fail if not logged in, which is fine
  const {
    data: tasks,
    isLoading,
    isError,
    refetch,
  } = useQuery(trpc.task.listToday.queryOptions());

  // Use mock data when there's an error (not logged in) or no data
  const useMockData = isError || !tasks;
  const displayTasks = useMockData ? mockTasks : tasks;

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
      if (useMockData) {
        // Toggle mock task locally
        setMockTasks((prev) =>
          prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  status: isCompleted ? "completed" : ("pending" as const),
                }
              : t
          )
        );
      } else {
        toggleCompleteMutation.mutate({ id, isCompleted });
      }
    },
    [toggleCompleteMutation, useMockData]
  );

  // Separate priorities from other tasks
  const { allTasks, completedCount, totalCount } = useMemo(() => {
    if (!displayTasks) {
      return { allTasks: [], completedCount: 0, totalCount: 0 };
    }

    const completed = displayTasks.filter((t) => t.status === "completed");
    const incomplete = displayTasks.filter((t) => t.status !== "completed");

    return {
      allTasks: [...incomplete, ...completed],
      completedCount: completed.length,
      totalCount: displayTasks.length,
    };
  }, [displayTasks]);

  const renderTaskItem = ({ item }: { item: Task }) => {
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

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-2">
        <Button onPress={openDrawer} size="icon" variant="ghost">
          <MenuIcon color={theme.colors.foreground} size={24} />
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
