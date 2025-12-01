import { useRouter } from "expo-router";
import { BellOff, Check, Pause, Play, Plus, X } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const SECONDS_PER_MINUTE = 60;
const DEFAULT_MINUTES = 25;
const FIVE = 5;
const DEFAULT_TIME = DEFAULT_MINUTES * SECONDS_PER_MINUTE;
const FIVE_MINUTES = FIVE * SECONDS_PER_MINUTE;
const ONE_SECOND = 1000;

export default function FocusModeScreen() {
  const router = useRouter();

  // Mock task data - in real app would fetch by ID
  const taskTitle = "Finish Q3 Report";

  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [isActive, setIsActive] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, ONE_SECOND);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsComplete(true);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTimer = useCallback(() => setIsActive((prev) => !prev), []);

  const addFiveMinutes = useCallback(() => {
    setTimeLeft((prev) => prev + FIVE_MINUTES);
  }, []);

  const handleComplete = useCallback(() => {
    // Logic to mark task as complete
    router.back();
  }, [router]);

  const handleEndSession = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    if (isComplete) {
      Alert.alert("Focus session complete! 🎉", "What would you like to do?", [
        { text: "Mark Complete", onPress: handleComplete },
        { text: "Add 5 min", onPress: addFiveMinutes },
        { text: "Exit", onPress: handleEndSession, style: "cancel" },
      ]);
    }
  }, [isComplete, handleComplete, addFiveMinutes, handleEndSession]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        {/* Task Title */}
        <View className="mb-12 items-center">
          <Text className="mb-2 font-medium text-lg text-muted-foreground">
            Focusing on
          </Text>
          <Text className="text-center font-bold text-3xl text-foreground">
            {taskTitle}
          </Text>
        </View>

        {/* Timer */}
        <View className="mb-12 h-64 w-64 items-center justify-center rounded-full border-4 border-primary/20 bg-card/50">
          <Text className="font-bold text-6xl text-foreground tabular-nums">
            {formatTime(timeLeft)}
          </Text>
          <View className="mt-2 flex-row items-center">
            <BellOff className="mr-2 text-muted-foreground" size={16} />
            <Text className="text-muted-foreground text-sm">
              Notifications silenced
            </Text>
          </View>
        </View>

        {/* Controls */}
        <View className="mb-16 flex-row gap-6">
          <Button
            className="h-16 w-16 rounded-full"
            onPress={toggleTimer}
            size="icon"
            variant="outline"
          >
            {isActive ? (
              <Pause className="text-foreground" size={28} />
            ) : (
              <Play className="ml-1 text-foreground" size={28} />
            )}
          </Button>

          <Button
            className="h-16 w-16 rounded-full"
            onPress={addFiveMinutes}
            size="icon"
            variant="outline"
          >
            <Plus className="text-foreground" size={28} />
            <Text className="-bottom-6 absolute font-medium text-muted-foreground text-xs">
              +5m
            </Text>
          </Button>
        </View>

        {/* Actions */}
        <View className="w-full gap-4">
          <Button
            className="h-14 w-full bg-success hover:bg-success/90"
            onPress={handleComplete}
          >
            <Check className="mr-2 text-primary-foreground" size={20} />
            <Text className="font-semibold text-lg text-primary-foreground">
              Mark Complete & Exit
            </Text>
          </Button>

          <Button
            className="h-12 w-full"
            onPress={handleEndSession}
            variant="ghost"
          >
            <X className="mr-2 text-muted-foreground" size={20} />
            <Text className="font-medium text-base text-muted-foreground">
              End Session
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
