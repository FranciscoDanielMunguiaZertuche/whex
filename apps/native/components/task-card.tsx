import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export type TaskCardProps = {
  id: string;
  title: string;
  notes?: string | null;
  isPriority: boolean;
  isCompleted: boolean;
  projectName?: string | null;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
};

export function TaskCard({
  id,
  title,
  notes,
  isPriority,
  isCompleted,
  projectName,
  onToggleComplete,
}: TaskCardProps) {
  const handleToggle = () => {
    onToggleComplete(id, !isCompleted);
  };

  const getCheckboxStyle = () => {
    if (isCompleted) {
      return "border-success bg-success";
    }
    if (isPriority) {
      return "border-warning";
    }
    return "border-border";
  };

  return (
    <View className="flex-row items-start rounded-xl bg-card p-4">
      {/* Checkbox */}
      <TouchableOpacity
        className="mt-0.5 mr-3"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={handleToggle}
      >
        <View
          className={`h-6 w-6 items-center justify-center rounded-full border-2 ${getCheckboxStyle()}`}
        >
          {isCompleted && <Ionicons color="#fff" name="checkmark" size={14} />}
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
    </View>
  );
}
