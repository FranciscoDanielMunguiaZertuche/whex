import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { trpc } from "@/utils/trpc";

export default function QuickAddModal() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [isPriority, setIsPriority] = useState(false);

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
      className="flex-1"
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="max-h-[85%] rounded-t-2xl bg-background">
          {/* Header */}
          <View className="flex-row items-center justify-between border-border border-b px-4 py-4">
            <TouchableOpacity className="min-w-[60px]" onPress={handleCancel}>
              <Text className="text-base text-muted-foreground">Cancel</Text>
            </TouchableOpacity>
            <Text className="font-semibold text-foreground text-lg">
              Quick Add
            </Text>
            <TouchableOpacity
              className="min-w-[60px]"
              disabled={!isValid || isLoading}
              onPress={handleSave}
            >
              <Text
                className={`text-right font-semibold text-base text-info ${
                  (!isValid || isLoading) && "opacity-50"
                }`}
              >
                {isLoading ? "Saving..." : "Done"}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1 p-6"
            keyboardShouldPersistTaps="handled"
          >
            {/* Title Input */}
            <View className="mb-6">
              <TextInput
                autoFocus
                className="min-h-[40px] font-medium text-foreground text-xl"
                maxLength={200}
                multiline
                onChangeText={setTitle}
                placeholder="What needs to be done?"
                placeholderTextColor="#737373"
                returnKeyType="next"
                value={title}
              />
            </View>

            {/* Notes Input */}
            <View className="mb-6">
              <Text className="mb-2 font-medium text-muted-foreground text-sm">
                Notes
              </Text>
              <TextInput
                className="min-h-[80px] rounded-lg border border-border bg-card p-4 text-base text-foreground"
                maxLength={1000}
                multiline
                numberOfLines={3}
                onChangeText={setNotes}
                placeholder="Add details..."
                placeholderTextColor="#737373"
                style={{ textAlignVertical: "top" }}
                value={notes}
              />
            </View>

            {/* Priority Toggle */}
            <View className="flex-row items-center justify-between border-border border-t py-4">
              <View className="flex-row items-center gap-2">
                <Ionicons
                  color={isPriority ? "#F59E0B" : "#737373"}
                  name="star"
                  size={20}
                />
                <Text className="text-base text-foreground">Priority</Text>
              </View>
              <Switch
                onValueChange={setIsPriority}
                thumbColor="#fff"
                trackColor={{ false: "#E6E6E6", true: "#F59E0B" }}
                value={isPriority}
              />
            </View>

            {/* Quick Tips */}
            <View className="mt-6 rounded-lg border border-border bg-card p-4">
              <Text className="mb-2 font-semibold text-foreground text-sm">
                💡 Tips
              </Text>
              <Text className="text-muted-foreground text-sm leading-6">
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
