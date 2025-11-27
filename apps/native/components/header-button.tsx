import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "react-native";

const PRESSED_OPACITY = 0.7;
const DEFAULT_OPACITY = 1;

type HeaderButtonProps = {
  onPress?: () => void;
};

export const HeaderButton = ({ onPress }: HeaderButtonProps) => (
  <Pressable className="mr-2 rounded-lg bg-secondary/50 p-2" onPress={onPress}>
    {({ pressed }) => (
      <FontAwesome
        className="text-secondary-foreground"
        name="info-circle"
        size={20}
        style={{ opacity: pressed ? PRESSED_OPACITY : DEFAULT_OPACITY }}
      />
    )}
  </Pressable>
);
