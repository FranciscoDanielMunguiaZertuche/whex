import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  Folder,
  MoreHorizontal,
  Share,
  Tag,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/lib/theme-context";

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();

  const isNew = id === "new";
  const [title, setTitle] = useState(isNew ? "" : "Meeting notes - Sarah call");
  const [content, setContent] = useState(
    isNew
      ? ""
      : "Discussed Q4 planning with Sarah:\n\n• Budget approved for new hire\n• Launch date moved to Dec 15\n• Need to finalize marketing plan\n\nAction items:\n[ ] Schedule follow-up meeting\n[ ] Send updated timeline\n[x] Review budget spreadsheet"
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity className="mr-4" onPress={() => router.back()}>
              <ArrowLeft color={theme.colors.foreground} size={24} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View className="flex-row gap-4">
              <TouchableOpacity>
                <Share color={theme.colors.foreground} size={24} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MoreHorizontal color={theme.colors.foreground} size={24} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <ScrollView className="flex-1 p-4">
        {/* Metadata Header */}
        <View className="mb-6 gap-2">
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1 rounded-full bg-secondary/30 px-2 py-1">
              <Folder color={theme.colors.mutedForeground} size={12} />
              <Text className="font-medium text-muted-foreground text-xs">
                Work
              </Text>
            </View>
            <View className="flex-row items-center gap-1 rounded-full bg-secondary/30 px-2 py-1">
              <Tag color={theme.colors.mutedForeground} size={12} />
              <Text className="font-medium text-muted-foreground text-xs">
                #work
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-2">
            <Calendar color={theme.colors.mutedForeground} size={12} />
            <Text className="text-muted-foreground text-xs">
              Modified: Today 2:30 PM
            </Text>
          </View>
        </View>

        {/* Title Input */}
        <TextInput
          className="mb-4 font-bold text-3xl text-foreground"
          multiline
          onChangeText={setTitle}
          placeholder="Note Title"
          placeholderTextColor={theme.colors.mutedForeground}
          value={title}
        />

        {/* Divider */}
        <View className="mb-6 h-[1px] w-full bg-border/50" />

        {/* Content Editor (Mock Rich Text) */}
        <TextInput
          className="min-h-[300px] text-base text-foreground leading-relaxed"
          multiline
          onChangeText={setContent}
          placeholder="Start typing..."
          placeholderTextColor={theme.colors.mutedForeground}
          textAlignVertical="top"
          value={content}
        />
      </ScrollView>

      {/* Formatting Toolbar (Mock) */}
      <View className="border-border border-t bg-background p-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            <Button size="sm" variant="ghost">
              <Text className="font-bold">B</Text>
            </Button>
            <Button size="sm" variant="ghost">
              <Text className="italic">I</Text>
            </Button>
            <Button size="sm" variant="ghost">
              <Text className="line-through">S</Text>
            </Button>
            <View className="mx-1 h-8 w-[1px] bg-border" />
            <Button size="sm" variant="ghost">
              <Text>• List</Text>
            </Button>
            <Button size="sm" variant="ghost">
              <Text>☑ Check</Text>
            </Button>
            <View className="mx-1 h-8 w-[1px] bg-border" />
            <Button size="sm" variant="ghost">
              <Text>Link</Text>
            </Button>
            <Button size="sm" variant="ghost">
              <Text>Image</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
