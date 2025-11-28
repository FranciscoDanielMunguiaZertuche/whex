import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Menu,
  MoreHorizontal,
} from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useDrawer } from "@/lib/drawer-context";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

const START_HOUR = 8;
const END_HOUR = 20; // 8 PM
const HOURS_COUNT = END_HOUR - START_HOUR + 1;
const NOON = 12;
const ROW_HEIGHT = 80;

export default function CalendarScreen() {
  const { theme } = useTheme();
  const { openDrawer } = useDrawer();
  const hours = Array.from({ length: HOURS_COUNT }, (_, i) => i + START_HOUR);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between border-border/50 border-b px-4 py-2">
        <View className="flex-row items-center gap-2">
          <Button onPress={openDrawer} size="icon" variant="ghost">
            <Menu color={theme.colors.foreground} size={24} />
          </Button>
          <Button className="h-8 w-8" size="icon" variant="ghost">
            <ChevronLeft color={theme.colors.foreground} size={20} />
          </Button>
          <Text className="font-bold text-foreground text-lg">Nov 2025</Text>
          <Button className="h-8 w-8" size="icon" variant="ghost">
            <ChevronRight color={theme.colors.foreground} size={20} />
          </Button>
        </View>

        <View className="flex-row rounded-lg bg-secondary/30 p-1">
          <TouchableOpacity className="rounded-md bg-background px-3 py-1 shadow-sm">
            <Text className="font-medium text-foreground text-xs">Day</Text>
          </TouchableOpacity>
          <TouchableOpacity className="rounded-md px-3 py-1">
            <Text className="font-medium text-muted-foreground text-xs">
              Week
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Week Strip */}
      <View className="flex-row justify-between border-border/50 border-b bg-card/30 px-4 py-4">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <View
            className={cn(
              "items-center gap-1",
              index === 2 && "-my-1 rounded-lg bg-primary/10 px-2 py-1"
            )}
            key={day}
          >
            <Text
              className={cn(
                "font-medium text-xs",
                index === 2 ? "text-primary" : "text-muted-foreground"
              )}
            >
              {day}
            </Text>
            <Text
              className={cn(
                "font-bold text-sm",
                index === 2 ? "text-primary" : "text-foreground"
              )}
            >
              {index + 1}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar Scroll */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-row">
          {/* Time Column */}
          <View className="w-16 items-center border-border/30 border-r py-4">
            {hours.map((hour) => (
              <View className="h-20 justify-start" key={hour}>
                <Text className="font-medium text-muted-foreground text-xs">
                  {hour > NOON ? hour - NOON : hour}{" "}
                  {hour >= NOON ? "PM" : "AM"}
                </Text>
              </View>
            ))}
          </View>

          {/* Events Column */}
          <View className="relative flex-1 py-4">
            {/* Grid Lines */}
            {hours.map((hour) => (
              <View
                className="absolute top-0 h-20 w-full border-border/10 border-b"
                key={`line-${hour}`}
                style={{ top: (hour - START_HOUR) * ROW_HEIGHT }}
              />
            ))}

            {/* Current Time Indicator (Mock) */}
            <View
              className="absolute z-10 w-full flex-row items-center"
              style={{ top: 220 }}
            >
              <View className="-ml-1 h-2 w-2 rounded-full bg-primary" />
              <View className="h-[2px] flex-1 bg-primary" />
            </View>

            {/* Event: Team Sync */}
            <View
              className="absolute right-2 left-2 h-[70px] rounded-r-md border-blue-500 border-l-4 bg-blue-500/20 p-2"
              style={{ top: 85 }}
            >
              <Text className="font-bold text-blue-700 text-xs dark:text-blue-300">
                Team Sync
              </Text>
              <Text className="text-[10px] text-blue-600 dark:text-blue-400">
                9:00 - 10:00 AM
              </Text>
            </View>

            {/* Task: Draft Report */}
            <View
              className="absolute right-2 left-2 h-[110px] rounded-md border border-primary/50 border-dashed bg-card p-2"
              style={{ top: 170 }}
            >
              <View className="mb-1 flex-row items-center gap-1">
                <Text className="text-xs">⭐</Text>
                <Text className="font-bold text-foreground text-xs">
                  Draft Report
                </Text>
              </View>
              <Text className="text-[10px] text-muted-foreground">
                10:00 AM - 11:30 AM
              </Text>
            </View>

            {/* AI Suggestion */}
            <View
              className="absolute right-2 left-2 h-[70px] items-center justify-center rounded-md border border-yellow-500/50 border-dashed bg-yellow-500/10 p-2"
              style={{ top: 410 }}
            >
              <View className="flex-row items-center gap-2">
                <Text>💡</Text>
                <Text className="font-medium text-xs text-yellow-700 dark:text-yellow-400">
                  Focus time?
                </Text>
              </View>
              <Text className="text-[10px] text-yellow-600 dark:text-yellow-500">
                Suggested 1:00 - 2:00 PM
              </Text>
            </View>

            {/* Event: Budget Mtg */}
            <View
              className="absolute right-2 left-2 h-[70px] rounded-r-md border-purple-500 border-l-4 bg-purple-500/20 p-2"
              style={{ top: 640 }}
            >
              <Text className="font-bold text-purple-700 text-xs dark:text-purple-300">
                Budget Mtg
              </Text>
              <Text className="text-[10px] text-purple-600 dark:text-purple-400">
                4:00 - 5:00 PM
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Unscheduled Tray */}
      <View className="border-border border-t bg-card p-3 pb-6">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="font-bold text-muted-foreground text-xs uppercase tracking-wider">
            Unscheduled Tasks (3)
          </Text>
          <TouchableOpacity>
            <MoreHorizontal color={theme.colors.mutedForeground} size={16} />
          </TouchableOpacity>
        </View>
        <ScrollView
          className="gap-3"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {["Draft slides", "Review budget", "Call Sarah"].map((task) => (
            <View
              className="w-32 rounded-lg border border-border bg-secondary/30 p-3"
              key={task}
            >
              <Text className="mb-1 font-medium text-foreground text-sm">
                {task}
              </Text>
              <View className="flex-row items-center gap-1">
                <Clock color={theme.colors.mutedForeground} size={10} />
                <Text className="text-[10px] text-muted-foreground">30m</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
