import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/utils/trpc";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setIsLoading(true);
    setError(null);

    await authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: (signUpResult) => {
          setError(signUpResult.error?.message || "Failed to sign up");
          setIsLoading(false);
        },
        onFinished: () => {
          setIsLoading(false);
        },
        onSuccess: () => {
          setName("");
          setEmail("");
          setPassword("");
          queryClient.refetchQueries();
        },
      }
    );
  };

  return (
    <View className="mt-6 rounded-lg border border-border p-4">
      <Text className="mb-4 font-semibold text-foreground text-lg">
        Create Account
      </Text>

      {error && (
        <View className="mb-4 rounded-md p-3">
          <Text className="text-destructive text-sm">{error}</Text>
        </View>
      )}

      <TextInput
        className="mb-3 rounded-md border border-border p-4 text-foreground"
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor="#737373"
        value={name}
      />

      <TextInput
        autoCapitalize="none"
        className="mb-3 rounded-md border border-border p-4 text-foreground"
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#737373"
        value={email}
      />

      <TextInput
        className="mb-4 rounded-md border border-border p-4 text-foreground"
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#737373"
        secureTextEntry
        value={password}
      />

      <TouchableOpacity
        className="flex-row items-center justify-center rounded-md bg-primary p-4"
        disabled={isLoading}
        onPress={handleSignUp}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text className="font-medium text-primary-foreground">Sign Up</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
