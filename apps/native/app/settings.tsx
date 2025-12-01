import { Stack, useRouter } from "expo-router";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  LogOut,
  Shield,
  Sun,
  User,
} from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, mode, setMode } = useTheme();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Settings",
          headerLeft: () => (
            <TouchableOpacity className="mr-4" onPress={() => router.back()}>
              <ArrowLeft color={theme.colors.foreground} size={24} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Appearance */}
        <View className="mb-6">
          <Text className="mb-3 font-bold text-muted-foreground text-xs uppercase tracking-wider">
            Appearance
          </Text>
          <View className="overflow-hidden rounded-xl border border-border bg-card">
            <View className="flex-row items-center justify-between border-border border-b p-4">
              <View className="flex-row items-center gap-3">
                <Sun color={theme.colors.foreground} size={20} />
                <Text className="font-medium text-foreground">Theme</Text>
              </View>
              <View className="flex-row rounded-lg bg-secondary p-1">
                {(["light", "system", "dark"] as const).map((m) => (
                  <TouchableOpacity
                    className={cn(
                      "rounded-md px-3 py-1",
                      mode === m && "bg-background shadow-sm"
                    )}
                    key={m}
                    onPress={() => setMode(m)}
                  >
                    <Text
                      className={cn(
                        "font-medium text-xs",
                        mode === m ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {m.charAt(0).toUpperCase() + m.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Account */}
        <View className="mb-6">
          <Text className="mb-3 font-bold text-muted-foreground text-xs uppercase tracking-wider">
            Account
          </Text>
          <View className="overflow-hidden rounded-xl border border-border bg-card">
            <TouchableOpacity className="flex-row items-center justify-between border-border border-b p-4">
              <View className="flex-row items-center gap-3">
                <User color={theme.colors.foreground} size={20} />
                <Text className="font-medium text-foreground">Profile</Text>
              </View>
              <ChevronRight color={theme.colors.mutedForeground} size={16} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between border-border border-b p-4">
              <View className="flex-row items-center gap-3">
                <Bell color={theme.colors.foreground} size={20} />
                <Text className="font-medium text-foreground">
                  Notifications
                </Text>
              </View>
              <ChevronRight color={theme.colors.mutedForeground} size={16} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-3">
                <Shield color={theme.colors.foreground} size={20} />
                <Text className="font-medium text-foreground">
                  Privacy & Security
                </Text>
              </View>
              <ChevronRight color={theme.colors.mutedForeground} size={16} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Out */}
        <Button
          className="mt-4 border-destructive"
          onPress={handleSignOut}
          variant="outline"
        >
          <LogOut className="mr-2" color={theme.colors.destructive} size={18} />
          <Text className="text-destructive">Sign Out</Text>
        </Button>

        <Text className="mt-8 text-center text-muted-foreground text-xs">
          Version 1.0.0 (Build 102)
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
