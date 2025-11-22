import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Container } from "@/components/container";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const { styles } = useStyles(stylesheet);
  const { data: tasks, isLoading, refetch } = trpc.task.listToday.useQuery();
  const utils = trpc.useUtils();
  const toggleCompleteMutation = trpc.task.toggleComplete.useMutation({
    onSuccess: () => {
      utils.task.listToday.invalidate();
    },
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleToggle = (id: string, currentStatus: string) => {
    toggleCompleteMutation.mutate({
      id,
      isCompleted: currentStatus !== "completed",
    });
  };

  return (
    <Container>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <View style={styles.headerSection}>
          <Text style={styles.title}>Today</Text>
          <Text style={styles.subtitle}>
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        {isLoading && <Text>Loading tasks...</Text>}

        {!isLoading && tasks?.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No tasks for today. Enjoy your day!
            </Text>
          </View>
        )}

        {!isLoading && tasks && tasks.length > 0 && (
          <View style={styles.taskList}>
            {tasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                onPress={() => handleToggle(task.id, task.status)}
                style={[
                  styles.taskCard,
                  task.status === "completed" && styles.taskCardCompleted,
                ]}
              >
                <View
                  style={[
                    styles.checkbox,
                    task.status === "completed" && styles.checkboxChecked,
                  ]}
                >
                  {task.status === "completed" && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
                <View style={styles.taskContent}>
                  <Text
                    style={[
                      styles.taskTitle,
                      task.status === "completed" && styles.taskTitleCompleted,
                    ]}
                  >
                    {task.title}
                  </Text>
                  {task.isPriority && (
                    <Text style={styles.priorityBadge}>⭐ Priority</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </Container>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 100,
  },
  headerSection: {
    paddingVertical: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSize["3xl"],
    fontWeight: "bold",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.mutedForeground,
  },
  taskList: {
    gap: theme.spacing.md,
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  taskCardCompleted: {
    opacity: 0.6,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginRight: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
  },
  checkmark: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.foreground,
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: theme.colors.mutedForeground,
  },
  priorityBadge: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
    marginTop: 4,
  },
  emptyState: {
    padding: theme.spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    color: theme.colors.mutedForeground,
    fontSize: theme.fontSize.md,
  },
}));
