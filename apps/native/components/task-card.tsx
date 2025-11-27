import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/lib/theme-context";
import type { Theme } from "@/theme";

export type TaskCardProps = {
  id: string;
  title: string;
  notes?: string | null;
  isPriority: boolean;
  isCompleted: boolean;
  dueDate?: Date | null;
  projectName?: string | null;
  projectColor?: string | null;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onPress?: (id: string) => void;
};

const formatDueDate = (date: Date): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const taskDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (taskDate.getTime() === today.getTime()) {
    return `Today ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  }
  if (taskDate.getTime() === tomorrow.getTime()) {
    return `Tomorrow ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  }
  if (taskDate < today) {
    return "Overdue";
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

const TaskCard = memo(
  ({
    id,
    title,
    isPriority,
    isCompleted,
    dueDate,
    projectName,
    projectColor,
    onToggleComplete,
    onPress,
  }: TaskCardProps) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const isOverdue = dueDate && new Date(dueDate) < new Date() && !isCompleted;

    return (
      <Pressable
        onPress={() => onPress?.(id)}
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      >
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => onToggleComplete(id, !isCompleted)}
          style={styles.checkbox}
        >
          <View
            style={[
              styles.checkboxInner,
              isCompleted && styles.checkboxCompleted,
              isPriority && !isCompleted && styles.checkboxPriority,
            ]}
          >
            {isCompleted && (
              <Ionicons color="#fff" name="checkmark" size={14} />
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            {isPriority && !isCompleted && (
              <Ionicons
                color={theme.colors.warning}
                name="star"
                size={14}
                style={styles.priorityIcon}
              />
            )}
            <Text
              numberOfLines={2}
              style={[styles.title, isCompleted && styles.titleCompleted]}
            >
              {title}
            </Text>
          </View>

          <View style={styles.metaRow}>
            {projectName && (
              <View style={styles.metaItem}>
                <View
                  style={[
                    styles.projectDot,
                    { backgroundColor: projectColor || theme.colors.info },
                  ]}
                />
                <Text style={styles.metaText}>{projectName}</Text>
              </View>
            )}
            {dueDate && (
              <View style={styles.metaItem}>
                <Ionicons
                  color={
                    isOverdue
                      ? theme.colors.destructive
                      : theme.colors.mutedForeground
                  }
                  name="time-outline"
                  size={12}
                />
                <Text
                  style={[styles.metaText, isOverdue && styles.overdueText]}
                >
                  {formatDueDate(new Date(dueDate))}
                </Text>
              </View>
            )}
          </View>
        </View>

        <Ionicons
          color={theme.colors.mutedForeground}
          name="chevron-forward"
          size={16}
          style={styles.chevron}
        />
      </Pressable>
    );
  }
);

TaskCard.displayName = "TaskCard";

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    pressed: {
      opacity: 0.7,
    },
    checkbox: {
      marginRight: theme.spacing.md,
    },
    checkboxInner: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: theme.colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxCompleted: {
      backgroundColor: theme.colors.success,
      borderColor: theme.colors.success,
    },
    checkboxPriority: {
      borderColor: theme.colors.warning,
    },
    content: {
      flex: 1,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    priorityIcon: {
      marginRight: 6,
    },
    title: {
      fontSize: theme.fontSize.base,
      fontWeight: "500",
      color: theme.colors.foreground,
      flex: 1,
    },
    titleCompleted: {
      textDecorationLine: "line-through",
      color: theme.colors.mutedForeground,
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 6,
      gap: 12,
    },
    metaItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    projectDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    metaText: {
      fontSize: theme.fontSize.xs,
      color: theme.colors.mutedForeground,
    },
    overdueText: {
      color: theme.colors.destructive,
      fontWeight: "500",
    },
    chevron: {
      marginLeft: theme.spacing.sm,
    },
  });

export default TaskCard;
