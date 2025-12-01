import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export type SwipeableTaskCardProps = {
  id: string;
  title: string;
  notes?: string | null;
  isPriority: boolean;
  isCompleted: boolean;
  projectName?: string | null;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
  onPress?: () => void;
};

const SWIPE_THRESHOLD = 80;
const MAX_SWIPE_LEFT = -100;
const MAX_SWIPE_RIGHT = 0; // Disable right swipe
const DELETE_ANIMATION_TARGET = -400;
const DELETE_ANIMATION_DURATION = 200;

export function SwipeableTaskCard({
  id,
  title,
  notes,
  isPriority,
  isCompleted,
  projectName,
  onToggleComplete,
  onDelete,
  onPress,
}: SwipeableTaskCardProps) {
  const translateX = useSharedValue(0);

  const handleToggle = useCallback(() => {
    onToggleComplete(id, !isCompleted);
  }, [id, isCompleted, onToggleComplete]);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  const getCheckboxStyle = () => {
    if (isCompleted) {
      return "border-success bg-success";
    }
    if (isPriority) {
      return "border-warning";
    }
    return "border-border";
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((event) => {
      translateX.value = event.translationX;
      // Limit swipe distance
      if (translateX.value < MAX_SWIPE_LEFT) {
        translateX.value = MAX_SWIPE_LEFT;
      }
      if (translateX.value > MAX_SWIPE_RIGHT) {
        translateX.value = MAX_SWIPE_RIGHT;
      }
    })
    .onEnd(() => {
      if (translateX.value < -SWIPE_THRESHOLD) {
        // Swipe Left -> Delete
        runOnJS(handleDelete)();
        translateX.value = withTiming(DELETE_ANIMATION_TARGET, {
          duration: DELETE_ANIMATION_DURATION,
        });
      } else {
        // Snap back
        translateX.value = withSpring(0);
      }
    });

  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(handlePress)();
  });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedDeleteStyle = useAnimatedStyle(() => ({
    opacity:
      translateX.value < 0
        ? Math.min(Math.abs(translateX.value) / SWIPE_THRESHOLD, 1)
        : 0,
  }));

  return (
    <View className="relative mb-3 overflow-hidden rounded-xl">
      {/* Delete action (Right side, revealed on Left swipe) */}
      <Animated.View
        className="absolute top-0 right-0 bottom-0 w-24 items-center justify-center bg-destructive"
        style={animatedDeleteStyle}
      >
        <Ionicons color="#fff" name="trash-outline" size={24} />
        <Text className="mt-1 font-medium text-white text-xs">Delete</Text>
      </Animated.View>

      {/* Swipeable card */}
      <GestureDetector gesture={composedGesture}>
        <Animated.View
          className="flex-row items-start bg-card p-4"
          style={animatedCardStyle}
        >
          {/* Checkbox */}
          <TouchableOpacity
            className="mt-0.5 mr-3"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={handleToggle}
          >
            <View
              className={`h-6 w-6 items-center justify-center rounded-full border-2 ${getCheckboxStyle()}`}
            >
              {isCompleted && (
                <Ionicons color="#fff" name="checkmark" size={14} />
              )}
            </View>
          </TouchableOpacity>

          {/* Content */}
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              {isPriority && !isCompleted && (
                <Ionicons color="#F59E0B" name="star" size={14} />
              )}
              <Text
                className={`flex-1 text-base ${
                  isCompleted
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }`}
                numberOfLines={2}
              >
                {title}
              </Text>
            </View>

            {notes && (
              <Text
                className="mt-1 text-muted-foreground text-sm"
                numberOfLines={1}
              >
                {notes}
              </Text>
            )}

            {projectName && (
              <View className="mt-2 flex-row items-center">
                <Ionicons color="#737373" name="folder-outline" size={12} />
                <Text className="ml-1 text-muted-foreground text-xs">
                  {projectName}
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
