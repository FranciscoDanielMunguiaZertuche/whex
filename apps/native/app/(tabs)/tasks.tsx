import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Check,
  Lightbulb,
  Mail,
  MoreHorizontal,
  Sparkles,
  Star,
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
import type { Theme } from "@/theme";
import { trpc } from "@/utils/trpc";

// Mock data for when user is not logged in
const MOCK_TASKS = [
  {
    id: "1",
    title: "Review product roadmap for Q1",
    status: "pending" as const,
    isPriority: true,
    projectName: "Product",
    dueTime: "5:00 PM",
  },
  {
    id: "2",
    title: "Prepare investor pitch deck",
    status: "pending" as const,
    isPriority: true,
    projectName: "Fundraising",
    dueTime: "2:00 PM",
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
    dueTime: "Tomorrow 10 AM",
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

function TasksHeader({
  priorityTasks,
  renderTaskItem,
  theme,
}: {
  priorityTasks: Task[];
  renderTaskItem: (props: { item: Task }) => React.ReactElement;
  theme: Theme;
}) {
  return (
    <View>
      {/* AI Focus Briefing */}
      <View className="mb-6 rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
        <View className="mb-2 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Sparkles color={theme.colors.primary} size={16} />
            <Text className="font-bold text-primary text-xs uppercase tracking-wider">
              Daily Briefing
            </Text>
          </View>
          <TouchableOpacity>
            <Text className="font-medium text-muted-foreground text-xs">
              Tap to expand ↗
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="font-medium text-foreground text-lg">
          Good morning. 3 priorities, 1 overdue, 30-min gap at 2 PM.
        </Text>
      </View>

      {/* Priorities Section */}
      {priorityTasks.length > 0 && (
        <View className="mb-6">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="font-bold text-muted-foreground text-xs uppercase tracking-wider">
              Priorities ({priorityTasks.length})
            </Text>
          </View>
          {priorityTasks.map((task) => (
            <View key={task.id}>{renderTaskItem({ item: task })}</View>
          ))}
        </View>
      )}

      {/* Actionable Emails (Mock) */}
      <View className="mb-6">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="font-bold text-muted-foreground text-xs uppercase tracking-wider">
            Actionable Emails (2)
          </Text>
        </View>
        <View className="mb-3 rounded-2xl border border-border/30 bg-card/50 p-4">
          <View className="mb-2 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Mail color={theme.colors.mutedForeground} size={14} />
              <Text className="font-medium text-foreground text-sm">
                john@company.com
              </Text>
            </View>
            <Text className="text-muted-foreground text-xs">10m ago</Text>
          </View>
          <Text className="mb-1 font-medium text-foreground text-sm">
            Re: Q3 Budget - needs review
          </Text>
          <Text className="mb-3 text-muted-foreground text-xs">
            AI: Asks for feedback by Friday
          </Text>
          <View className="flex-row gap-2">
            <Button className="h-8" size="sm" variant="outline">
              <Text>Reply</Text>
            </Button>
            <Button className="h-8" size="sm" variant="outline">
              <Text>Archive</Text>
            </Button>
            <Button className="h-8" size="sm" variant="secondary">
              <Text>→ Task</Text>
            </Button>
          </View>
        </View>
      </View>

      {/* AI Suggestions (Mock) */}
      <View className="mb-6">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="font-bold text-muted-foreground text-xs uppercase tracking-wider">
            AI Suggestions (1)
          </Text>
        </View>
        <View className="flex-row items-center justify-between rounded-2xl border border-primary/30 border-dashed bg-primary/5 p-4">
          <View className="flex-1 flex-row items-center gap-3">
            <View className="h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Lightbulb color={theme.colors.primary} size={16} />
            </View>
            <View>
              <Text className="font-medium text-foreground text-sm">
                Draft Q3 Report for Sarah?
              </Text>
              <Text className="text-muted-foreground text-xs">
                Based on email request
              </Text>
            </View>
          </View>
          <View className="flex-row gap-2">
            <Button className="h-8 w-8" size="icon" variant="ghost">
              <Check color={theme.colors.primary} size={16} />
            </Button>
          </View>
        </View>
      </View>

      {/* Other Tasks Header */}
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="font-bold text-muted-foreground text-xs uppercase tracking-wider">
          Other Tasks
        </Text>
      </View>
    </View>
  );
}

export default function Today() {
  const { theme } = useTheme();
  const { openDrawer } = useDrawer();
  const queryClient = useQueryClient();
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
  const { priorityTasks, otherTasks } = useMemo(() => {
    if (!displayTasks) {
      return {
        priorityTasks: [],
        otherTasks: [],
      };
    }

    const completed = displayTasks.filter((t) => t.status === "completed");
    const incomplete = displayTasks.filter((t) => t.status !== "completed");
    const priorities = incomplete.filter((t) => t.isPriority);
    const others = incomplete.filter((t) => !t.isPriority);

    return {
      priorityTasks: priorities,
      otherTasks: [...others, ...completed],
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
              <Text className="text-muted-foreground text-xs">
                {item.dueTime || "today"}
              </Text>
              <Text className="text-muted-foreground text-xs">•</Text>
              <Text className="font-medium text-primary text-xs">
                {item.projectName || "Inbox"}
              </Text>
            </View>
          </View>
        </View>

        <View className="ml-2">
          {item.isPriority && (
            <Star
              color={theme.colors.warning}
              fill={theme.colors.warning}
              size={16}
            />
          )}
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
        <View className="flex-row gap-2">
          <Button size="icon" variant="ghost">
            <MoreHorizontal color={theme.colors.foreground} size={24} />
          </Button>
        </View>
      </View>

      {/* Task List */}
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        data={otherTasks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <TasksHeader
            priorityTasks={priorityTasks}
            renderTaskItem={renderTaskItem}
            theme={theme}
          />
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
