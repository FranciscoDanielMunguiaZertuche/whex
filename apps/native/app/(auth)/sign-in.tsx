import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  return (
    <View className="flex-1 items-center bg-background p-5 pt-24">
      <Text className="font-bold text-3xl text-foreground">Sign In</Text>
      <Text className="mt-5 text-base text-muted-foreground">
        Sign in screen works!
      </Text>
      <Link asChild href="/(auth)/sign-up">
        <TouchableOpacity className="mt-10">
          <Text className="text-base text-info">Go to Sign Up</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
