import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SwipeableTaskCard from "@/components/swipeable-task-card";
import { useTheme } from "@/lib/theme-context";
import type { Theme } from "@/theme";
import { trpc } from "@/utils/trpc";

const MAX_PRIORITIES = 3;
const MAX_COMPLETED_SHOWN = 5;
const MORNING_HOUR = 12;
const AFTERNOON_HOUR = 17;

export default function Today() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
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

  const handleTaskPress = useCallback((_id: string) => {
    // TODO: Navigate to task detail screen
  }, []);

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
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator color={theme.colors.info} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.title}>Today</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={isRefetching}
            tintColor={theme.colors.info}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.content}
      >
        {/* Daily Briefing Card */}
        <View style={styles.briefingCard}>
          <Text style={styles.briefingEmoji}>🌅</Text>
          <View style={styles.briefingContent}>
            <Text style={styles.briefingTitle}>Daily Briefing</Text>
            <Text style={styles.briefingText}>
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              PRIORITIES ({priorities.length})
            </Text>
            {priorities.map((task) => (
              <SwipeableTaskCard
                dueDate={task.dueDate}
                id={task.id}
                isCompleted={task.status === "completed"}
                isPriority={task.isPriority}
                key={task.id}
                notes={task.notes}
                onDelete={handleDelete}
                onPress={handleTaskPress}
                onToggleComplete={handleToggleComplete}
                projectColor={task.project?.color}
                projectName={task.project?.name}
                title={task.title}
              />
            ))}
          </View>
        )}

        {/* Other Tasks Section */}
        {otherTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              OTHER TASKS ({otherTasks.length})
            </Text>
            {otherTasks.map((task) => (
              <SwipeableTaskCard
                dueDate={task.dueDate}
                id={task.id}
                isCompleted={task.status === "completed"}
                isPriority={task.isPriority}
                key={task.id}
                notes={task.notes}
                onDelete={handleDelete}
                onPress={handleTaskPress}
                onToggleComplete={handleToggleComplete}
                projectColor={task.project?.color}
                projectName={task.project?.name}
                title={task.title}
              />
            ))}
          </View>
        )}

        {/* Completed Tasks Section */}
        {completedTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              COMPLETED ({completedTasks.length})
            </Text>
            {completedTasks.slice(0, MAX_COMPLETED_SHOWN).map((task) => (
              <SwipeableTaskCard
                dueDate={task.dueDate}
                id={task.id}
                isCompleted={task.status === "completed"}
                isPriority={task.isPriority}
                key={task.id}
                notes={task.notes}
                onDelete={handleDelete}
                onPress={handleTaskPress}
                onToggleComplete={handleToggleComplete}
                projectColor={task.project?.color}
                projectName={task.project?.name}
                title={task.title}
              />
            ))}
          </View>
        )}

        {/* Empty State */}
        {tasks?.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>✨</Text>
            <Text style={styles.emptyTitle}>All clear!</Text>
            <Text style={styles.emptyText}>
              Tap the + button to add your first task.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    centered: {
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 16,
    },
    greeting: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.mutedForeground,
      marginBottom: 4,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.colors.foreground,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      padding: 20,
      paddingTop: 0,
    },
    briefingCard: {
      flexDirection: "row",
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    briefingEmoji: {
      fontSize: 24,
      marginRight: theme.spacing.md,
    },
    briefingContent: {
      flex: 1,
    },
    briefingTitle: {
      fontSize: theme.fontSize.base,
      fontWeight: "600",
      color: theme.colors.foreground,
      marginBottom: 4,
    },
    briefingText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.mutedForeground,
      lineHeight: 20,
    },
    section: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      fontSize: theme.fontSize.xs,
      fontWeight: "600",
      color: theme.colors.mutedForeground,
      letterSpacing: 0.5,
      marginBottom: theme.spacing.sm,
    },
    emptyState: {
      alignItems: "center",
      paddingVertical: theme.spacing.xxl,
    },
    emptyEmoji: {
      fontSize: 48,
      marginBottom: theme.spacing.md,
    },
    emptyTitle: {
      fontSize: theme.fontSize.xl,
      fontWeight: "600",
      color: theme.colors.foreground,
      marginBottom: theme.spacing.sm,
    },
    emptyText: {
      fontSize: theme.fontSize.base,
      color: theme.colors.mutedForeground,
      textAlign: "center",
    },
  });
