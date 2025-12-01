import { router } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MoreHorizontal,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "@/components/ui/menu-icon";
import { Text } from "@/components/ui/text";
import { useDrawer } from "@/lib/drawer-context";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

const START_HOUR = 8;
const END_HOUR = 20; // 8 PM
const HOURS_COUNT = END_HOUR - START_HOUR + 1;
const NOON = 12;
const ROW_HEIGHT = 80;
const DAYS_IN_WEEK = 7;
const SUNDAY_OFFSET = -6;
const MONDAY_OFFSET = 1;

// Helper functions
const getStartOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? SUNDAY_OFFSET : MONDAY_OFFSET); // Monday start
  return new Date(d.setDate(diff));
};

const formatMonthYear = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "short", year: "numeric" });

const formatDayName = (date: Date) =>
  date.toLocaleDateString("en-US", { weekday: "short" });

const isSameDay = (d1: Date, d2: Date) =>
  d1.getDate() === d2.getDate() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getFullYear() === d2.getFullYear();

export default function CalendarScreen() {
  const { theme } = useTheme();
  const { openDrawer } = useDrawer();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    getStartOfWeek(new Date())
  );

  const weekDays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date(currentWeekStart);
        d.setDate(d.getDate() + i);
        return d;
      }),
    [currentWeekStart]
  );

  const handlePrevWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() - DAYS_IN_WEEK);
    setCurrentWeekStart(newStart);
  };

  const handleNextWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() + DAYS_IN_WEEK);
    setCurrentWeekStart(newStart);
  };

  const handleTimeSlotPress = (hour: number) => {
    const date = new Date(selectedDate);
    date.setHours(hour, 0, 0, 0);
    // Navigate to modal with params (need to update modal to handle them)
    router.push(`/modal?type=event&date=${date.toISOString()}`);
  };

  const hours = Array.from({ length: HOURS_COUNT }, (_, i) => i + START_HOUR);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between border-border/50 border-b px-4 py-2">
        <View className="flex-row items-center gap-2">
          <Button onPress={openDrawer} size="icon" variant="ghost">
            <MenuIcon color={theme.colors.foreground} size={24} />
          </Button>
          <Button
            className="h-8 w-8"
            onPress={handlePrevWeek}
            size="icon"
            variant="ghost"
          >
            <ChevronLeft color={theme.colors.foreground} size={20} />
          </Button>
          <Text className="font-bold text-foreground text-lg">
            {formatMonthYear(currentWeekStart)}
          </Text>
          <Button
            className="h-8 w-8"
            onPress={handleNextWeek}
            size="icon"
            variant="ghost"
          >
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
        {weekDays.map((date) => {
          const isSelected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, new Date());

          return (
            <TouchableOpacity
              className={cn(
                "items-center gap-1 rounded-lg px-2 py-1",
                isSelected && "bg-primary/10"
              )}
              key={date.toISOString()}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                className={cn(
                  "font-medium text-xs",
                  isSelected ? "text-primary" : "text-muted-foreground",
                  isToday && !isSelected && "text-primary"
                )}
              >
                {formatDayName(date)}
              </Text>
              <Text
                className={cn(
                  "font-bold text-sm",
                  isSelected ? "text-primary" : "text-foreground",
                  isToday && !isSelected && "text-primary"
                )}
              >
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
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
          <View className="relative flex-1">
            {hours.map((hour) => (
              <TouchableOpacity
                className="h-20 w-full border-border/10 border-b"
                key={hour}
                onPress={() => handleTimeSlotPress(hour)}
              />
            ))}

            {/* Render Events Here (Mock) */}
            {/* Example Event */}
            <TouchableOpacity
              className="absolute right-2 left-2 rounded-lg border-primary border-l-4 bg-primary/20 p-2"
              style={{
                top: (10 - START_HOUR) * ROW_HEIGHT,
                height: ROW_HEIGHT,
              }}
            >
              <Text className="font-bold text-primary text-xs">
                Team Meeting
              </Text>
              <Text className="text-[10px] text-primary/80">
                10:00 AM - 11:00 AM
              </Text>
            </TouchableOpacity>
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
