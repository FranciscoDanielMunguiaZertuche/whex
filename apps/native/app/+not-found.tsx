import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Container } from "@/components/container";
import { useTheme } from "@/lib/theme-context";

const BUTTON_VERTICAL_PADDING_OFFSET = 4;

export default function NotFoundScreen() {
  const { theme } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Container>
        <View style={[styles.container, { padding: theme.spacing.lg }]}>
          <View style={styles.content}>
            <Text style={[styles.emoji, { marginBottom: theme.spacing.md }]}>
              🤔
            </Text>
            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.foreground,
                  marginBottom: theme.spacing.sm,
                },
              ]}
            >
              Page Not Found
            </Text>
            <Text
              style={[
                styles.description,
                {
                  color: theme.colors.mutedForeground,
                  marginBottom: theme.spacing.xl,
                },
              ]}
            >
              Sorry, the page you're looking for doesn't exist.
            </Text>
            <Link
              href="/"
              style={[
                styles.button,
                {
                  backgroundColor: `${theme.colors.primary}1A`,
                  paddingHorizontal: theme.spacing.lg,
                  paddingVertical:
                    theme.spacing.sm + BUTTON_VERTICAL_PADDING_OFFSET,
                  borderRadius: theme.borderRadius.lg,
                },
              ]}
            >
              <Text
                style={[styles.buttonText, { color: theme.colors.primary }]}
              >
                Go to Home
              </Text>
            </Link>
          </View>
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  emoji: {
    fontSize: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    maxWidth: 280,
  },
  button: {},
  buttonText: {
    fontWeight: "500",
  },
});
