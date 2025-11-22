import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Container } from "@/components/container";
import { trpc } from "@/utils/trpc";

export default function Modal() {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isPriority, setIsPriority] = useState(false);

  const utils = trpc.useUtils();
  const createTaskMutation = trpc.task.create.useMutation({
    onSuccess: () => {
      utils.task.listToday.invalidate();
      router.back();
    },
  });

  const handleCreate = () => {
    if (!title.trim()) {
      return;
    }

    createTaskMutation.mutate({
      title,
      isPriority,
    });
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>New Task</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>What needs to be done?</Text>
            <TextInput
              autoFocus
              onChangeText={setTitle}
              placeholder="e.g. Finish report"
              placeholderTextColor="#999"
              style={styles.input}
              value={title}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Mark as Priority</Text>
            <Switch onValueChange={setIsPriority} value={isPriority} />
          </View>

          <TouchableOpacity
            disabled={!title.trim() || createTaskMutation.isPending}
            onPress={handleCreate}
            style={[
              styles.submitButton,
              !title.trim() && styles.submitButtonDisabled,
            ]}
          >
            {createTaskMutation.isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Create Task</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSize["2xl"],
    fontWeight: "bold",
    color: theme.colors.foreground,
  },
  cancelButton: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.md,
  },
  form: {
    gap: theme.spacing.xl,
  },
  inputGroup: {
    gap: theme.spacing.sm,
  },
  label: {
    fontSize: theme.fontSize.md,
    color: theme.colors.foreground,
    fontWeight: "500",
  },
  input: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.foreground,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: theme.spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: "center",
    marginTop: theme.spacing.md,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: theme.fontSize.md,
  },
}));
