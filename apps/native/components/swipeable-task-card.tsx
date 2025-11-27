import { Ionicons } from "@expo/vector-icons";
import { memo, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/lib/theme-context";
import type { Theme } from "@/theme";

const SWIPE_THRESHOLD = 80;
const ACTION_WIDTH = 80;
const OPACITY_THRESHOLD = 20;

export type SwipeableTaskCardProps = {
  id: string;
  title: string;
  notes?: string | null;
  isPriority: boolean;
  isCompleted: boolean;
  dueDate?: Date | null;
  projectName?: string | null;
  projectColor?: string | null;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onDelete?: (id: string) => void;
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

const SwipeableTaskCard = memo(
  ({
    id,
    title,
    isPriority,
    isCompleted,
    dueDate,
    projectName,
    projectColor,
    onToggleComplete,
    onDelete,
    onPress,
  }: SwipeableTaskCardProps) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const translateX = useSharedValue(0);
    const isOverdue = dueDate && new Date(dueDate) < new Date() && !isCompleted;

    const handleComplete = useCallback(() => {
      onToggleComplete(id, !isCompleted);
    }, [id, isCompleted, onToggleComplete]);

    const handleDelete = useCallback(() => {
      onDelete?.(id);
    }, [id, onDelete]);

    const handlePress = useCallback(() => {
      onPress?.(id);
    }, [id, onPress]);

    const panGesture = Gesture.Pan()
      .activeOffsetX([-10, 10])
      .onUpdate((event) => {
        // Allow swipe right for complete (positive) and left for delete (negative)
        translateX.value = Math.max(
          -ACTION_WIDTH,
          Math.min(ACTION_WIDTH, event.translationX)
        );
      })
      .onEnd((event) => {
        if (event.translationX > SWIPE_THRESHOLD) {
          // Swipe right - complete
          translateX.value = withSpring(0);
          runOnJS(handleComplete)();
        } else if (event.translationX < -SWIPE_THRESHOLD) {
          // Swipe left - delete
          translateX.value = withSpring(0);
          runOnJS(handleDelete)();
        } else {
          translateX.value = withSpring(0);
        }
      });

    const tapGesture = Gesture.Tap().onEnd(() => {
      runOnJS(handlePress)();
    });

    const composedGestures = Gesture.Race(panGesture, tapGesture);

    const animatedCardStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }],
    }));

    const leftActionStyle = useAnimatedStyle(() => ({
      opacity: withTiming(translateX.value > OPACITY_THRESHOLD ? 1 : 0),
    }));

    const rightActionStyle = useAnimatedStyle(() => ({
      opacity: withTiming(translateX.value < -OPACITY_THRESHOLD ? 1 : 0),
    }));

    return (
      <View style={styles.wrapper}>
        {/* Left Action (Complete) */}
        <Animated.View style={[styles.leftAction, leftActionStyle]}>
          <Ionicons
            color="#fff"
            name={isCompleted ? "arrow-undo" : "checkmark-circle"}
            size={24}
          />
          <Text style={styles.actionText}>
            {isCompleted ? "Undo" : "Complete"}
          </Text>
        </Animated.View>

        {/* Right Action (Delete) */}
        <Animated.View style={[styles.rightAction, rightActionStyle]}>
          <Ionicons color="#fff" name="trash" size={24} />
          <Text style={styles.actionText}>Delete</Text>
        </Animated.View>

        {/* Main Card */}
        <GestureDetector gesture={composedGestures}>
          <Animated.View style={[styles.container, animatedCardStyle]}>
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={handleComplete}
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
          </Animated.View>
        </GestureDetector>
      </View>
    );
  }
);

SwipeableTaskCard.displayName = "SwipeableTaskCard";

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: theme.spacing.sm,
      position: "relative",
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    leftAction: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: ACTION_WIDTH,
      backgroundColor: theme.colors.success,
      borderRadius: theme.borderRadius.lg,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    rightAction: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: ACTION_WIDTH,
      backgroundColor: theme.colors.destructive,
      borderRadius: theme.borderRadius.lg,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    actionText: {
      color: "#fff",
      fontSize: theme.fontSize.xs,
      fontWeight: "600",
      marginTop: 4,
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

export default SwipeableTaskCard;
