import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/lib/theme-context";
import type { Theme } from "@/theme";
import { trpc } from "@/utils/trpc";

export default function QuickAddModal() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [isPriority, setIsPriority] = useState(false);

  // Create task mutation
  const createTaskMutation = useMutation(
    trpc.task.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["task", "listToday"]] });
        router.back();
      },
    })
  );

  const handleSave = useCallback(() => {
    if (!title.trim()) {
      return;
    }

    createTaskMutation.mutate({
      title: title.trim(),
      notes: notes.trim() || undefined,
      isPriority,
    });
  }, [title, notes, isPriority, createTaskMutation]);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const isValid = title.trim().length > 0;
  const isLoading = createTaskMutation.isPending;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.headerButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Quick Add</Text>
            <TouchableOpacity
              disabled={!isValid || isLoading}
              onPress={handleSave}
              style={styles.headerButton}
            >
              <Text
                style={[
                  styles.doneText,
                  (!isValid || isLoading) && styles.doneTextDisabled,
                ]}
              >
                {isLoading ? "Saving..." : "Done"}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            style={styles.content}
          >
            {/* Title Input */}
            <View style={styles.inputGroup}>
              <TextInput
                autoFocus
                maxLength={200}
                multiline
                onChangeText={setTitle}
                placeholder="What needs to be done?"
                placeholderTextColor={theme.colors.mutedForeground}
                returnKeyType="next"
                style={styles.titleInput}
                value={title}
              />
            </View>

            {/* Notes Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Notes</Text>
              <TextInput
                maxLength={1000}
                multiline
                numberOfLines={3}
                onChangeText={setNotes}
                placeholder="Add details..."
                placeholderTextColor={theme.colors.mutedForeground}
                style={styles.notesInput}
                value={notes}
              />
            </View>

            {/* Priority Toggle */}
            <View style={styles.optionRow}>
              <View style={styles.optionLeft}>
                <Ionicons
                  color={
                    isPriority
                      ? theme.colors.warning
                      : theme.colors.mutedForeground
                  }
                  name="star"
                  size={20}
                />
                <Text style={styles.optionLabel}>Priority</Text>
              </View>
              <Switch
                onValueChange={setIsPriority}
                thumbColor="#fff"
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.warning,
                }}
                value={isPriority}
              />
            </View>

            {/* Quick Tips */}
            <View style={styles.tips}>
              <Text style={styles.tipsTitle}>💡 Tips</Text>
              <Text style={styles.tipsText}>
                • Maximum 3 priorities per day for focus{"\n"}• Add notes for
                context and subtasks{"\n"}• AI parsing coming soon!
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
    },
    modal: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
      maxHeight: "85%",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerButton: {
      minWidth: 60,
    },
    headerTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: "600",
      color: theme.colors.foreground,
    },
    cancelText: {
      fontSize: theme.fontSize.base,
      color: theme.colors.mutedForeground,
    },
    doneText: {
      fontSize: theme.fontSize.base,
      color: theme.colors.info,
      fontWeight: "600",
      textAlign: "right",
    },
    doneTextDisabled: {
      opacity: 0.5,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      padding: theme.spacing.lg,
    },
    inputGroup: {
      marginBottom: theme.spacing.lg,
    },
    inputLabel: {
      fontSize: theme.fontSize.sm,
      fontWeight: "500",
      color: theme.colors.mutedForeground,
      marginBottom: theme.spacing.sm,
    },
    titleInput: {
      fontSize: theme.fontSize.xl,
      fontWeight: "500",
      color: theme.colors.foreground,
      minHeight: 40,
    },
    notesInput: {
      fontSize: theme.fontSize.base,
      color: theme.colors.foreground,
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      minHeight: 80,
      textAlignVertical: "top",
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    optionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    optionLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    optionLabel: {
      fontSize: theme.fontSize.base,
      color: theme.colors.foreground,
    },
    tips: {
      marginTop: theme.spacing.lg,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    tipsTitle: {
      fontSize: theme.fontSize.sm,
      fontWeight: "600",
      color: theme.colors.foreground,
      marginBottom: theme.spacing.sm,
    },
    tipsText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.mutedForeground,
      lineHeight: 22,
    },
  });
