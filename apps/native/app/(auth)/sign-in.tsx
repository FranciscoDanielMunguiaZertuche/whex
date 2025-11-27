import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/lib/theme-context";

export default function SignInScreen() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
        paddingTop: 100,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Sign In
      </Text>
      <Text
        style={{
          color: theme.colors.mutedForeground,
          fontSize: 16,
          marginTop: 20,
        }}
      >
        Sign in screen works!
      </Text>
      <Link asChild href="/(auth)/sign-up">
        <TouchableOpacity style={{ marginTop: 40 }}>
          <Text style={{ color: theme.colors.info, fontSize: 16 }}>
            Go to Sign Up
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
