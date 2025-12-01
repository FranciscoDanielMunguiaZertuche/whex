import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

const SIMULATED_DELAY = 1000;

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
      // Navigate to onboarding or tabs
      // For now, go to tabs
      router.replace("/(tabs)/chat?onboarding=true");
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-background p-6">
      <View className="mx-auto w-full max-w-sm gap-6">
        <View className="items-center gap-2">
          <Text className="font-bold text-3xl text-foreground">
            Create an account
          </Text>
          <Text className="text-center text-muted-foreground">
            Enter your details to get started
          </Text>
        </View>

        <View className="gap-4">
          <View className="gap-2">
            <Text className="font-medium text-foreground">Name</Text>
            <Input onChangeText={setName} placeholder="John Doe" value={name} />
          </View>
          <View className="gap-2">
            <Text className="font-medium text-foreground">Email</Text>
            <Input
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="name@example.com"
              value={email}
            />
          </View>
          <View className="gap-2">
            <Text className="font-medium text-foreground">Password</Text>
            <Input
              onChangeText={setPassword}
              placeholder="Create a password"
              secureTextEntry
              value={password}
            />
          </View>

          <Button disabled={loading} onPress={handleSignUp}>
            <Text className="font-medium text-primary-foreground">
              {loading ? "Creating account..." : "Sign Up"}
            </Text>
          </Button>
        </View>

        <View className="relative py-2">
          <View className="absolute inset-0 flex items-center justify-center">
            <View className="w-full border-border border-t" />
          </View>
          <View className="relative flex flex-row justify-center">
            <Text className="bg-background px-2 text-center text-muted-foreground text-xs uppercase">
              Or continue with
            </Text>
          </View>
        </View>

        <View className="gap-2">
          {/* Mock Social Buttons */}
          <Button
            onPress={() => {
              /* TODO */
            }}
            variant="outline"
          >
            <Text className="text-foreground">Google</Text>
          </Button>
          <Button
            onPress={() => {
              /* TODO */
            }}
            variant="outline"
          >
            <Text className="text-foreground">Apple</Text>
          </Button>
        </View>

        <View className="flex-row justify-center gap-1">
          <Text className="text-muted-foreground">
            Already have an account?
          </Text>
          <Link asChild href="/(auth)/sign-in">
            <Text className="font-medium text-primary">Sign in</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
