import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Container } from "@/components/container";
import { SignUp as SignUpComponent } from "@/components/sign-up";

export default function SignUpScreen() {
  const { styles } = useStyles(stylesheet);
  return (
    <Container>
      <View style={styles.container}>
        <SignUpComponent />
        <View style={styles.footer}>
          <Text style={styles.text}>Already have an account? </Text>
          <Link asChild href="/(auth)/sign-in">
            <TouchableOpacity>
              <Text style={styles.link}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </Container>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: theme.spacing.lg,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.xl,
  },
  text: {
    color: theme.colors.mutedForeground,
    fontSize: theme.fontSize.md,
  },
  link: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.md,
    fontWeight: "bold",
  },
}));
