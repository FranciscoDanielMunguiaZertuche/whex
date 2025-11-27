import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "@/lib/theme-context";
import { queryClient } from "@/utils/trpc";

export function SignIn() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: (signInResult) => {
          setError(signInResult.error?.message || "Failed to sign in");
          setIsLoading(false);
        },
        onSuccess: () => {
          setEmail("");
          setPassword("");
          queryClient.refetchQueries();
        },
        onFinished: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <View style={[styles.container, { borderColor: theme.colors.border }]}>
      <Text style={[styles.title, { color: theme.colors.typography }]}>
        Sign In
      </Text>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.destructive }]}>
            {error}
          </Text>
        </View>
      )}

      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={theme.colors.mutedForeground}
        style={[
          styles.input,
          { color: theme.colors.typography, borderColor: theme.colors.border },
        ]}
        value={email}
      />

      <TextInput
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={theme.colors.mutedForeground}
        secureTextEntry
        style={[
          styles.input,
          { color: theme.colors.typography, borderColor: theme.colors.border },
        ]}
        value={password}
      />

      <TouchableOpacity
        disabled={isLoading}
        onPress={handleLogin}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
      >
        {isLoading ? (
          <ActivityIndicator
            color={theme.colors.primaryForeground}
            size="small"
          />
        ) : (
          <Text
            style={[
              styles.buttonText,
              { color: theme.colors.primaryForeground },
            ]}
          >
            Sign In
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  errorContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 6,
  },
  errorText: {
    fontSize: 14,
  },
  input: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 6,
    borderWidth: 1,
  },
  button: {
    padding: 16,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "500",
  },
});
