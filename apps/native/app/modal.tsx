import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  Calendar,
  Clock,
  Flag,
  Hash,
  Mic,
  Sparkles,
  X,
} from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
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
const AI_DEBOUNCE_MS = 800;

type ParsedData = {
  project?: string;
  date?: string;
  priority?: boolean;
};

function parseInput(title: string): ParsedData {
  const lowerTitle = title.toLowerCase();
  const newParsedData: ParsedData = {};

  if (lowerTitle.includes("urgent") || lowerTitle.includes("asap")) {
    newParsedData.priority = true;
  }

  if (lowerTitle.includes("tomorrow")) {
    newParsedData.date = "Tomorrow";
  } else if (lowerTitle.includes("today")) {
    newParsedData.date = "Today";
  } else if (lowerTitle.includes("next week")) {
    newParsedData.date = "Next Week";
  }

  if (lowerTitle.includes("project")) {
    newParsedData.project = "Project";
  } else if (lowerTitle.includes("design")) {
    newParsedData.project = "Design";
  } else if (lowerTitle.includes("marketing")) {
    newParsedData.project = "Marketing";
  } else {
    newParsedData.project = "Inbox";
  }

  return newParsedData;
}

export default function QuickAddModal() {
  const router = useRouter();
  const { theme } = useTheme();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [type, setType] = useState<"task" | "note" | "event">("task");
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedData>({});

  const createTaskMutation = useMutation(
    trpc.task.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["task", "listToday"]] });
        router.back();
      },
    })
  );

  // Mock AI Parsing Logic
  useEffect(() => {
    if (title.length < MIN_TITLE_LENGTH_FOR_AI) {
      setParsedData({});
      setIsParsing(false);
      return;
    }

    setIsParsing(true);
    const timer = setTimeout(() => {
      const newParsedData = parseInput(title);
      setParsedData(newParsedData);
      setIsParsing(false);
    }, AI_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [title]);

  const handleSave = useCallback(() => {
    if (!title.trim()) {
      return;
    }

    createTaskMutation.mutate({
      title: title.trim(),
      isPriority: parsedData.priority ?? false,
    });
  }, [title, parsedData, createTaskMutation]);

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

        {/* AI Preview */}
        {(title.length > MIN_TITLE_LENGTH_FOR_AI || isParsing) && (
          <View className="mb-4 rounded-xl border border-border bg-secondary/20 p-4">
            <View className="mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Sparkles color={theme.colors.primary} size={16} />
                <Text className="font-bold text-primary text-xs uppercase tracking-wider">
                  AI Detected
                </Text>
              </View>
              {isParsing && <ActivityIndicator size="small" />}
            </View>

            {!isParsing && (
              <View className="flex-row flex-wrap gap-2">
                {/* Project Tag */}
                <View className="flex-row items-center gap-1 rounded-md bg-blue-500/10 px-2 py-1">
                  <Hash color={theme.colors.primary} size={12} />
                  <Text className="font-medium text-blue-500 text-xs">
                    {parsedData.project || "Inbox"}
                  </Text>
                </View>

                {/* Date Tag */}
                {parsedData.date && (
                  <View className="flex-row items-center gap-1 rounded-md bg-orange-500/10 px-2 py-1">
                    <Calendar color="#f97316" size={12} />
                    <Text className="font-medium text-orange-500 text-xs">
                      {parsedData.date}
                    </Text>
                  </View>
                )}

                {/* Priority Tag */}
                {parsedData.priority && (
                  <View className="flex-row items-center gap-1 rounded-md bg-red-500/10 px-2 py-1">
                    <Flag color="#ef4444" size={12} />
                    <Text className="font-medium text-red-500 text-xs">
                      Priority
                    </Text>
                  </View>
                )}

                {/* Time Tag (Mock) */}
                {title.includes("at") && (
                  <View className="flex-row items-center gap-1 rounded-md bg-purple-500/10 px-2 py-1">
                    <Clock color="#a855f7" size={12} />
                    <Text className="font-medium text-purple-500 text-xs">
                      Set time
                    </Text>
                  </View>
                )}
              </View>
            )}
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
