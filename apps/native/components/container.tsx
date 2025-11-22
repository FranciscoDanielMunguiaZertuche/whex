import type React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export const Container = ({ children }: { children: React.ReactNode }) => {
  const { styles } = useStyles(stylesheet);
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const stylesheet = createStyleSheet((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingBottom: rt.insets.bottom,
  },
}));
