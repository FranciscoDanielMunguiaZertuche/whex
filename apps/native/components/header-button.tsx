import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/lib/theme-context";

const PRESSED_OPACITY = 0.7;
const DEFAULT_OPACITY = 1;

type HeaderButtonProps = {
  onPress?: () => void;
};

export const HeaderButton = ({ onPress }: HeaderButtonProps) => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          marginRight: theme.spacing.sm,
          padding: theme.spacing.sm,
          borderRadius: theme.borderRadius.lg,
          backgroundColor: `${theme.colors.secondary}80`,
        },
      ]}
    >
      {({ pressed }) => (
        <FontAwesome
          color={theme.colors.secondaryForeground}
          name="info-circle"
          size={20}
          style={{
            opacity: pressed ? PRESSED_OPACITY : DEFAULT_OPACITY,
          }}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {},
});
