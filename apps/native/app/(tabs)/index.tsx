import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SwipeableTaskCard } from "@/components/swipeable-task-card";
import { trpc } from "@/utils/trpc";

const MAX_PRIORITIES = 3;
const MAX_COMPLETED_SHOWN = 5;
const MORNING_HOUR = 12;
const AFTERNOON_HOUR = 17;

export default function Today() {
  const queryClient = useQueryClient();

  // Fetch tasks
  const {
    data: tasks,
    isLoading,
    isRefetching,
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

  // Delete mutation
  const deleteMutation = useMutation(
    trpc.task.delete.mutationOptions({
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

  const handleDelete = useCallback(
    (id: string) => {
      deleteMutation.mutate({ id });
    },
    [deleteMutation]
  );

  // Separate priorities from other tasks
  const { priorities, otherTasks, completedTasks } = useMemo(() => {
    if (!tasks) {
      return { priorities: [], otherTasks: [], completedTasks: [] };
    }

    const completed = tasks.filter((t) => t.status === "completed");
    const incomplete = tasks.filter((t) => t.status !== "completed");
    const priorityTasks = incomplete
      .filter((t) => t.isPriority)
      .slice(0, MAX_PRIORITIES);
    const other = incomplete.filter((t) => !t.isPriority);

    return {
      priorities: priorityTasks,
      otherTasks: other,
      completedTasks: completed,
    };
  }, [tasks]);

  // Get greeting based on time of day
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < MORNING_HOUR) {
      return "Good morning";
    }
    if (hour < AFTERNOON_HOUR) {
      return "Good afternoon";
    }
    return "Good evening";
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color="#3B82F6" size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="px-5 pt-16 pb-4">
        <Text className="mb-1 text-muted-foreground text-sm">{greeting}</Text>
        <Text className="font-bold text-3xl text-foreground">Today</Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-10"
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={isRefetching}
            tintColor="#3B82F6"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Daily Briefing Card */}
        <View className="mb-6 flex-row rounded-xl border border-border bg-card p-4">
          <Text className="mr-4 text-2xl">🌅</Text>
          <View className="flex-1">
            <Text className="mb-1 font-semibold text-base text-foreground">
              Daily Briefing
            </Text>
            <Text className="text-muted-foreground text-sm leading-5">
              {priorities.length > 0
                ? `You have ${priorities.length} priority ${priorities.length === 1 ? "task" : "tasks"} today.`
                : "No priorities set. Tap + to add tasks."}
              {otherTasks.length > 0 &&
                ` ${otherTasks.length} other ${otherTasks.length === 1 ? "task" : "tasks"} waiting.`}
            </Text>
          </View>
        </View>

        {/* Priorities Section */}
        {priorities.length > 0 && (
          <View className="mb-6">
            <View className="mb-2 flex-row items-center gap-2">
              <Ionicons color="#F59E0B" name="star" size={14} />
              <Text className="font-semibold text-muted-foreground text-xs tracking-wide">
                PRIORITIES ({priorities.length})
              </Text>
            </View>
            {priorities.map((task) => (
              <SwipeableTaskCard
                id={task.id}
                isCompleted={task.status === "completed"}
                isPriority={task.isPriority}
                key={task.id}
                notes={task.notes}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
                projectName={task.project?.name}
                title={task.title}
              />
            ))}
          </View>
        )}

        {/* Other Tasks Section */}
        {otherTasks.length > 0 && (
          <View className="mb-6">
            <Text className="mb-2 font-semibold text-muted-foreground text-xs tracking-wide">
              OTHER TASKS ({otherTasks.length})
            </Text>
            {otherTasks.map((task) => (
              <SwipeableTaskCard
                id={task.id}
                isCompleted={task.status === "completed"}
                isPriority={task.isPriority}
                key={task.id}
                notes={task.notes}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
                projectName={task.project?.name}
                title={task.title}
              />
            ))}
          </View>
        )}

        {/* Completed Tasks Section */}
        {completedTasks.length > 0 && (
          <View className="mb-6">
            <View className="mb-2 flex-row items-center gap-2">
              <Ionicons color="#22C55E" name="checkmark-circle" size={14} />
              <Text className="font-semibold text-muted-foreground text-xs tracking-wide">
                COMPLETED ({completedTasks.length})
              </Text>
            </View>
            {completedTasks.slice(0, MAX_COMPLETED_SHOWN).map((task) => (
              <SwipeableTaskCard
                id={task.id}
                isCompleted={task.status === "completed"}
                isPriority={task.isPriority}
                key={task.id}
                notes={task.notes}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
                projectName={task.project?.name}
                title={task.title}
              />
            ))}
          </View>
        )}

        {/* Empty State */}
        {tasks?.length === 0 && (
          <View className="items-center py-16">
            <Text className="mb-4 text-5xl">✨</Text>
            <Text className="mb-2 font-semibold text-foreground text-xl">
              All clear!
            </Text>
            <Text className="text-center text-base text-muted-foreground">
              Tap the + button to add your first task.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
