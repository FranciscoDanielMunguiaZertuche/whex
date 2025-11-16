import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Container } from "@/components/container";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const utils = trpc.useUtils();
  const { data: tasks, isLoading, error } = trpc.task.today.useQuery();
  const toggleComplete = trpc.task.toggleComplete.useMutation({
    onSuccess: () => {
      // Invalidate and refetch tasks
      utils.task.today.invalidate();
    },
  });

  if (isLoading) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading your day...</Text>
        </View>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error loading tasks</Text>
          <Text style={styles.errorSubtext}>{error.message}</Text>
        </View>
      </Container>
    );
  }

  const priorityTasks = tasks?.filter((task) => task.isPriorityTask) || [];
  const otherTasks = tasks?.filter((task) => !task.isPriorityTask) || [];

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Today</Text>
          <Text style={styles.subtitle}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        {priorityTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Priority Tasks</Text>
            {priorityTasks.map((task) => (
              <Pressable
                key={task.id}
                onPress={() => {
                  toggleComplete.mutate({ id: task.id });
                }}
                style={styles.taskCard}
              >
                <View style={styles.taskCheckbox}>
                  <View style={styles.checkbox} />
                </View>
                <View style={styles.taskContent}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  {task.description && (
                    <Text style={styles.taskDescription}>
                      {task.description}
                    </Text>
                  )}
                  <View style={styles.taskMeta}>
                    <Text style={styles.taskMetaText}>
                      {task.priority.toUpperCase()}
                    </Text>
                    {task.estimatedMinutes && (
                      <Text style={styles.taskMetaText}>
                        {task.estimatedMinutes}min
                      </Text>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {otherTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Other Tasks</Text>
            {otherTasks.map((task) => (
              <Pressable
                key={task.id}
                onPress={() => {
                  toggleComplete.mutate({ id: task.id });
                }}
                style={styles.taskCard}
              >
                <View style={styles.taskCheckbox}>
                  <View style={styles.checkbox} />
                </View>
                <View style={styles.taskContent}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  {task.description && (
                    <Text style={styles.taskDescription}>
                      {task.description}
                    </Text>
                  )}
                  {task.estimatedMinutes && (
                    <View style={styles.taskMeta}>
                      <Text style={styles.taskMetaText}>
                        {task.estimatedMinutes}min
                      </Text>
                    </View>
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {tasks?.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No tasks for today</Text>
            <Text style={styles.emptyStateSubtext}>
              Tap the + button to add a new task
            </Text>
          </View>
        )}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    padding: theme.spacing.lg,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xl,
  },
  headerSection: {
    paddingVertical: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSize["3xl"],
    fontWeight: "bold",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.base,
    color: theme.colors.mutedForeground,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSize.base,
    color: theme.colors.mutedForeground,
  },
  errorText: {
    fontSize: theme.fontSize.lg,
    fontWeight: "600",
    color: theme.colors.destructive,
    marginBottom: theme.spacing.xs,
  },
  errorSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mutedForeground,
    textAlign: "center",
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: "600",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.md,
  },
  taskCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  taskCheckbox: {
    marginRight: theme.spacing.md,
    paddingTop: theme.spacing.xs,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: "500",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  taskDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mutedForeground,
    marginBottom: theme.spacing.xs,
  },
  taskMeta: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  taskMetaText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.mutedForeground,
    textTransform: "uppercase",
  },
  emptyState: {
    alignItems: "center",
    padding: theme.spacing.xl,
    marginTop: theme.spacing["2xl"],
  },
  emptyStateText: {
    fontSize: theme.fontSize.lg,
    fontWeight: "600",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  emptyStateSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mutedForeground,
    textAlign: "center",
  },
}));
