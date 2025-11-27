import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/lib/theme-context";

export default function Chat() {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.foreground }]}>
          Chat
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.content}
      >
        <View
          style={[
            styles.welcomeCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text
            style={[styles.welcomeTitle, { color: theme.colors.foreground }]}
          >
            👋 Welcome to Whex
          </Text>
          <Text
            style={[
              styles.welcomeText,
              { color: theme.colors.mutedForeground },
            ]}
          >
            I'm your AI productivity companion. What's the first thing on your
            mind?
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  welcomeCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
