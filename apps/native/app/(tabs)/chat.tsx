import {
  ArrowUp,
  ChevronDown,
  Mic,
  Plus,
  SquarePen,
} from "lucide-react-native";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "@/components/ui/menu-icon";
import { Text } from "@/components/ui/text";
import { useDrawer } from "@/lib/drawer-context";
import { useTheme } from "@/lib/theme-context";

export default function Chat() {
  const { theme } = useTheme();
  const { openDrawer } = useDrawer();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-2">
        <Button onPress={openDrawer} size="icon" variant="ghost">
          <MenuIcon color={theme.colors.foreground} size={24} />
        </Button>
        <Text className="font-semibold text-lg">Chat</Text>
        <View className="flex-row gap-2">
          <Button size="icon" variant="ghost">
            <SquarePen color={theme.colors.foreground} size={24} />
          </Button>
          <Button size="icon" variant="ghost">
            <Plus color={theme.colors.foreground} size={24} />
          </Button>
        </View>
      </View>

      {/* Main Content - Pressable to dismiss keyboard */}
      <Pressable className="flex-1" onPress={Keyboard.dismiss}>
        <View className="flex-1 items-center justify-center">
          <View className="mb-4 flex-row items-center rounded-full border border-border/50 bg-muted/30 px-3 py-1">
            <Text className="text-muted-foreground text-xs">Free plan · </Text>
            <Text className="text-foreground text-xs underline">Upgrade</Text>
          </View>
          <Text className="font-bold text-4xl text-foreground tracking-tighter">
            whex.ai
          </Text>
        </View>
      </Pressable>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="p-4">
          <View className="rounded-[32px] border border-border/50 bg-secondary/20 p-4">
            <TextInput
              className="mb-4 px-2 text-foreground text-lg"
              placeholder="Ask Whex anything"
              placeholderTextColor={theme.colors.mutedForeground}
            />
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Button
                  className="h-8 w-8 rounded-full bg-muted/50"
                  size="icon"
                >
                  <Plus color={theme.colors.foreground} size={16} />
                </Button>
                <View className="flex-row items-center gap-1 rounded-full bg-muted/50 px-3 py-1.5">
                  <Text className="font-medium text-foreground text-xs">
                    Claude Haiku 4.5
                  </Text>
                  <ChevronDown color={theme.colors.mutedForeground} size={12} />
                </View>
              </View>
              <View className="flex-row items-center gap-3">
                <Mic color={theme.colors.mutedForeground} size={24} />
                <Button
                  className="h-8 w-8 rounded-full bg-muted/50"
                  size="icon"
                >
                  <ArrowUp color={theme.colors.foreground} size={16} />
                </Button>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
