import {
  BarChart2,
  Briefcase,
  Calendar,
  ChevronRight,
  CreditCard,
  HelpCircle,
  Menu,
  Settings,
  Target,
  User,
  Zap,
} from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useDrawer } from "@/lib/drawer-context";
import { useTheme } from "@/lib/theme-context";

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { openDrawer } = useDrawer();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="flex-row items-center gap-3">
          <Button onPress={openDrawer} size="icon" variant="ghost">
            <Menu color={theme.colors.foreground} size={24} />
          </Button>
          <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <User color={theme.colors.primary} size={20} />
          </View>
          <Text className="font-bold text-foreground text-xl">You</Text>
        </View>
        <Button size="icon" variant="ghost">
          <Settings color={theme.colors.foreground} size={24} />
        </Button>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* North Star Card */}
        <View className="mx-5 mt-2 mb-6 overflow-hidden rounded-2xl border border-primary/10 bg-primary/5">
          <View className="flex-row items-center gap-2 bg-primary/10 px-4 py-3">
            <Target color={theme.colors.primary} size={18} />
            <Text className="font-bold text-primary text-sm uppercase tracking-wide">
              Your North Star
            </Text>
          </View>
          <View className="p-5">
            <Text className="mb-4 font-serif text-foreground text-xl italic leading-7">
              "Help others achieve their potential through technology"
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {["Family", "Growth", "Authenticity", "Impact"].map((value) => (
                <View
                  className="rounded-full border border-border/50 bg-background/50 px-3 py-1"
                  key={value}
                >
                  <Text className="font-medium text-muted-foreground text-xs">
                    {value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Active Goals */}
        <View className="mb-8 px-5">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Text className="font-bold text-muted-foreground text-xs uppercase tracking-wider">
                Active Goals
              </Text>
              <View className="rounded-full bg-secondary px-2 py-0.5">
                <Text className="font-medium text-muted-foreground text-xs">
                  2
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text className="font-medium text-primary text-xs">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-3">
            <TouchableOpacity className="rounded-xl border border-border bg-card p-4">
              <View className="mb-2 flex-row items-start justify-between">
                <Text className="font-semibold text-base text-foreground">
                  Launch Product V1
                </Text>
                <View className="rounded-md bg-primary/10 px-2 py-1">
                  <Text className="font-medium text-primary text-xs">
                    12 days left
                  </Text>
                </View>
              </View>
              <View className="mb-2 h-2 overflow-hidden rounded-full bg-secondary">
                <View className="h-full w-[80%] rounded-full bg-primary" />
              </View>
              <Text className="text-muted-foreground text-xs">
                8 of 10 milestones complete
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="rounded-xl border border-border bg-card p-4">
              <View className="mb-2 flex-row items-start justify-between">
                <Text className="font-semibold text-base text-foreground">
                  Run 3x per week
                </Text>
                <View className="rounded-md bg-green-500/10 px-2 py-1">
                  <Text className="font-medium text-green-600 text-xs dark:text-green-400">
                    5 week streak
                  </Text>
                </View>
              </View>
              <View className="mb-2 h-2 overflow-hidden rounded-full bg-secondary">
                <View className="h-full w-[40%] rounded-full bg-green-500" />
              </View>
              <Text className="text-muted-foreground text-xs">
                Weekly goal: 1/3 runs
              </Text>
            </TouchableOpacity>

            <Button
              className="mt-1 border-border border-dashed"
              variant="outline"
            >
              <Text className="text-muted-foreground">+ Add Goal</Text>
            </Button>
          </View>
        </View>

        {/* Active Projects */}
        <View className="mb-8 px-5">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Text className="font-bold text-muted-foreground text-xs uppercase tracking-wider">
                Active Projects
              </Text>
              <View className="rounded-full bg-secondary px-2 py-0.5">
                <Text className="font-medium text-muted-foreground text-xs">
                  3
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text className="font-medium text-primary text-xs">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-3">
            <TouchableOpacity className="flex-row items-center justify-between rounded-xl border border-border bg-card p-4">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <BarChart2 color="#3B82F6" size={20} />
                </View>
                <View>
                  <Text className="font-semibold text-foreground">Work</Text>
                  <Text className="text-muted-foreground text-xs">
                    12 tasks remaining
                  </Text>
                </View>
              </View>
              <ChevronRight color={theme.colors.mutedForeground} size={16} />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between rounded-xl border border-border bg-card p-4">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <Briefcase color="#A855F7" size={20} />
                </View>
                <View>
                  <Text className="font-semibold text-foreground">
                    Marketing Campaign
                  </Text>
                  <Text className="text-muted-foreground text-xs">
                    8 tasks remaining
                  </Text>
                </View>
              </View>
              <ChevronRight color={theme.colors.mutedForeground} size={16} />
            </TouchableOpacity>

            <Button
              className="mt-1 border-border border-dashed"
              variant="outline"
            >
              <Text className="text-muted-foreground">+ Add Project</Text>
            </Button>
          </View>
        </View>

        {/* Insights & Reviews */}
        <View className="mb-8 px-5">
          <Text className="mb-4 font-bold text-muted-foreground text-xs uppercase tracking-wider">
            Insights & Reviews
          </Text>

          <View className="overflow-hidden rounded-xl border border-border bg-card">
            <View className="flex-row items-center justify-between border-border border-b p-4">
              <View>
                <Text className="mb-1 font-medium text-muted-foreground text-sm">
                  This Week
                </Text>
                <Text className="font-bold text-2xl text-foreground">
                  22
                  <Text className="font-normal text-lg text-muted-foreground">
                    /27 tasks
                  </Text>
                </Text>
              </View>
              <View className="items-end">
                <View className="mb-1 flex-row items-center gap-1">
                  <Zap color="#F59E0B" fill="#F59E0B" size={16} />
                  <Text className="font-bold text-foreground">7 day</Text>
                </View>
                <Text className="text-muted-foreground text-xs">streak</Text>
              </View>
            </View>
            <TouchableOpacity className="items-center bg-secondary/30 p-3">
              <Text className="font-medium text-primary text-sm">
                View Weekly Review
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Settings */}
        <View className="px-5 pb-8">
          <Text className="mb-4 font-bold text-muted-foreground text-xs uppercase tracking-wider">
            Quick Settings
          </Text>

          <View className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-3">
                <SparklesIcon color={theme.colors.foreground} />
                <Text className="font-medium text-foreground">
                  AI Assistants & Automations
                </Text>
              </View>
              <ChevronRight color={theme.colors.mutedForeground} size={16} />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-3">
                <SettingsIcon color={theme.colors.foreground} />
                <Text className="font-medium text-foreground">
                  Preferences & Theme
                </Text>
              </View>
              <ChevronRight color={theme.colors.mutedForeground} size={16} />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-3">
                <Calendar color={theme.colors.foreground} size={18} />
                <Text className="font-medium text-foreground">
                  Integrations & Calendar
                </Text>
              </View>
              <ChevronRight color={theme.colors.mutedForeground} size={16} />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-3">
                <CreditCard color={theme.colors.foreground} size={18} />
                <Text className="font-medium text-foreground">
                  Account & Subscription
                </Text>
              </View>
              <ChevronRight color={theme.colors.mutedForeground} size={16} />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-3">
                <HelpCircle color={theme.colors.foreground} size={18} />
                <Text className="font-medium text-foreground">
                  Help & Support
                </Text>
              </View>
              <ChevronRight color={theme.colors.mutedForeground} size={16} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SparklesIcon({ color }: { color: string }) {
  return <Zap color={color} size={18} />;
}

function SettingsIcon({ color }: { color: string }) {
  return <Settings color={color} size={18} />;
}
