import { Text, TouchableOpacity, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Container } from "@/components/container";
import { authClient } from "@/lib/auth-client";

export default function ProfileScreen() {
  const { styles } = useStyles(stylesheet);
  const handleSignOut = async () => {
    await authClient.signOut();
    // The _layout.tsx will handle the redirect
  };

  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>You</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize["3xl"],
    fontWeight: "bold",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xl,
  },
  section: {
    gap: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  button: {
    backgroundColor: theme.colors.destructive,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: theme.fontSize.base,
  },
}));
