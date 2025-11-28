import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Calendar, Flag, Hash, Mic, X } from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";

const MIN_TITLE_LENGTH_FOR_AI = 5;

export default function QuickAddModal() {
  const router = useRouter();
  const { theme } = useTheme();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [type, setType] = useState<"task" | "note" | "event">("task");

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
      isPriority: false, // Default for quick add
    });
  }, [title, createTaskMutation]);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-4">
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <Button onPress={handleCancel} size="icon" variant="ghost">
            <X color={theme.colors.foreground} size={24} />
          </Button>
          <View className="flex-row rounded-lg bg-secondary/30 p-1">
            {(["task", "note", "event"] as const).map((t) => (
              <TouchableOpacity
                className={cn(
                  "rounded-md px-3 py-1 capitalize",
                  type === t ? "bg-background shadow-sm" : ""
                )}
                key={t}
                onPress={() => setType(t)}
              >
                <Text
                  className={cn(
                    "font-medium text-xs",
                    type === t ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button
            className={cn("rounded-full px-4", !title.trim() && "opacity-50")}
            disabled={!title.trim() || createTaskMutation.isPending}
            onPress={handleSave}
            size="sm"
          >
            <Text className="font-medium text-primary-foreground">Done</Text>
          </Button>
        </View>

        {/* Input Area */}
        <View className="flex-1">
          <TextInput
            autoFocus
            className="mb-4 font-medium text-2xl text-foreground"
            multiline
            onChangeText={setTitle}
            placeholder="What's on your mind?"
            placeholderTextColor={theme.colors.mutedForeground}
            textAlignVertical="top"
            value={title}
          />
        </View>

        {/* AI Preview (Mock) */}
        {title.length > MIN_TITLE_LENGTH_FOR_AI && (
          <View className="mb-4 rounded-xl border border-border bg-secondary/20 p-4">
            <View className="mb-2 flex-row items-center gap-2">
              <Text className="font-bold text-primary text-xs uppercase tracking-wider">
                AI Detected
              </Text>
              <View className="h-[1px] flex-1 bg-border" />
            </View>
            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Text className="w-16 text-muted-foreground text-sm">Task</Text>
                <Text className="font-medium text-foreground text-sm">
                  "{title}"
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="w-16 text-muted-foreground text-sm">
                  Project
                </Text>
                <View className="rounded bg-blue-500/10 px-2 py-0.5 text-xs">
                  <Text className="font-medium text-blue-500 text-xs">
                    Inbox
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Toolbar */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
          <View className="flex-row items-center justify-between border-border/50 border-t pt-2">
            <View className="flex-row gap-4">
              <TouchableOpacity>
                <Calendar color={theme.colors.mutedForeground} size={24} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Hash color={theme.colors.mutedForeground} size={24} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Flag color={theme.colors.mutedForeground} size={24} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="rounded-full bg-primary/10 p-3">
              <Mic color={theme.colors.primary} size={24} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
