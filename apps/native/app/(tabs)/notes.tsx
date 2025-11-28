import { Pin, Plus, Search } from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "@/components/ui/menu-icon";
import { Text } from "@/components/ui/text";
import { useDrawer } from "@/lib/drawer-context";
import { useTheme } from "@/lib/theme-context";

export default function NotesScreen() {
  const { theme } = useTheme();
  const { openDrawer } = useDrawer();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between border-border/50 border-b px-4 py-3">
        <Button onPress={openDrawer} size="icon" variant="ghost">
          <MenuIcon color={theme.colors.foreground} size={24} />
        </Button>
        <Text className="font-bold text-foreground text-xl">Notes</Text>
        <View className="flex-row gap-2">
          <Button size="icon" variant="ghost">
            <Search color={theme.colors.foreground} size={24} />
          </Button>
          <Button size="icon" variant="ghost">
            <Plus color={theme.colors.foreground} size={24} />
          </Button>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Pinned Section */}
        <View className="mb-6">
          <View className="mb-3 flex-row items-center gap-2">
            <Text className="font-bold text-muted-foreground text-xs uppercase tracking-wider">
              Pinned
            </Text>
            <Text className="text-muted-foreground text-xs">(2)</Text>
          </View>

          <View className="gap-3">
            <TouchableOpacity className="rounded-xl border border-border bg-card p-4">
              <View className="mb-2 flex-row items-start justify-between">
                <Text className="font-semibold text-base text-foreground">
                  My Core Values
                </Text>
                <Pin
                  color={theme.colors.primary}
                  fill={theme.colors.primary}
                  size={14}
                />
              </View>
              <Text
                className="mb-3 text-muted-foreground text-sm"
                numberOfLines={2}
              >
                Family, Growth, Authenticity, Creativity, Resilience...
              </Text>
              <Text className="text-muted-foreground text-xs">
                Updated 3 days ago
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="rounded-xl border border-border bg-card p-4">
              <View className="mb-2 flex-row items-start justify-between">
                <Text className="font-semibold text-base text-foreground">
                  Project Ideas for 2025
                </Text>
                <Pin
                  color={theme.colors.primary}
                  fill={theme.colors.primary}
                  size={14}
                />
              </View>
              <Text
                className="mb-3 text-muted-foreground text-sm"
                numberOfLines={2}
              >
                Mobile app, SaaS product, AI integration ideas...
              </Text>
              <Text className="text-muted-foreground text-xs">
                Updated 1 week ago
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Section */}
        <View>
          <Text className="mb-3 font-bold text-muted-foreground text-xs uppercase tracking-wider">
            Recent
          </Text>

          <View className="gap-3">
            <TouchableOpacity className="rounded-xl border border-border bg-card p-4">
              <Text className="mb-2 font-semibold text-base text-foreground">
                Meeting notes - Sarah call
              </Text>
              <Text
                className="mb-3 text-muted-foreground text-sm"
                numberOfLines={2}
              >
                Discussed Q4 planning and marketing strategy for the new
                launch...
              </Text>
              <View className="flex-row items-center gap-3">
                <Text className="text-muted-foreground text-xs">
                  Today 2:30 PM
                </Text>
                <View className="rounded bg-secondary px-2 py-0.5 text-xs">
                  <Text className="text-[10px] text-secondary-foreground">
                    #work
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="rounded-xl border border-border bg-card p-4">
              <Text className="mb-2 font-semibold text-base text-foreground">
                Book: Atomic Habits insights
              </Text>
              <Text
                className="mb-3 text-muted-foreground text-sm"
                numberOfLines={2}
              >
                Key takeaways from reading the chapter on environment design...
              </Text>
              <View className="flex-row items-center gap-3">
                <Text className="text-muted-foreground text-xs">Yesterday</Text>
                <View className="rounded bg-secondary px-2 py-0.5 text-xs">
                  <Text className="text-[10px] text-secondary-foreground">
                    #learning
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
