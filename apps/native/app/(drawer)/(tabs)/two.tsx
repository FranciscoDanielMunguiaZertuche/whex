import { ScrollView, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Container } from "@/components/container";

export default function TabTwo() {
  const { styles } = useStyles(stylesheet);
  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Tab Two</Text>
          <Text style={styles.subtitle}>
            Discover more features and content
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: theme.spacing.lg,
  },
  headerSection: {
    paddingVertical: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSize["3xl"],
    fontWeight: "bold",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.mutedForeground,
  },
}));
