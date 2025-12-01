import { useRouter } from "expo-router";
import {
  Bot,
  HelpCircle,
  Plus,
  Search,
  Settings,
  Target,
} from "lucide-react-native";
import { useEffect } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/lib/theme-context";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH_RATIO = 0.85;
const DRAWER_WIDTH = SCREEN_WIDTH * DRAWER_WIDTH_RATIO;
const BACKDROP_OPACITY = 0.5;
const ANIMATION_DURATION = 300;

type ChatDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ChatDrawer({ isOpen, onClose }: ChatDrawerProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const translateX = useSharedValue(-DRAWER_WIDTH);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isOpen) {
      translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
      opacity.value = withTiming(BACKDROP_OPACITY, {
        duration: ANIMATION_DURATION,
      });
    } else {
      translateX.value = withTiming(-DRAWER_WIDTH, {
        duration: ANIMATION_DURATION,
      });
      opacity.value = withTiming(0, { duration: ANIMATION_DURATION });
    }
  }, [isOpen, translateX, opacity]);

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!isOpen && translateX.value === -DRAWER_WIDTH) {
    return null;
  }

  return (
    <Modal
      animationType="none"
      onRequestClose={onClose}
      transparent
      visible={isOpen}
    >
      <View className="flex-1 flex-row">
        {/* Backdrop */}
        <Animated.View
          className="absolute inset-0 bg-black"
          style={[backdropStyle]}
        >
          <TouchableOpacity
            activeOpacity={1}
            className="flex-1"
            onPress={onClose}
          />
        </Animated.View>

        {/* Drawer Content */}
        <Animated.View
          className="h-full border-border border-r bg-background"
          style={[drawerStyle, { width: DRAWER_WIDTH }]}
        >
          <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
            <View className="flex-1 p-4">
              {/* Search Bar */}
              <TouchableOpacity
                className="mb-6 flex-row items-center rounded-lg bg-secondary/50 px-3 py-2 active:bg-secondary"
                onPress={() => {
                  onClose();
                  router.push("/search");
                }}
              >
                <Search color={theme.colors.mutedForeground} size={18} />
                <Text className="ml-2 flex-1 font-medium text-muted-foreground">
                  Search
                </Text>
              </TouchableOpacity>

              <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
              >
                {/* Main Menu Items */}
                <View className="gap-1">
                  <TouchableOpacity
                    className="flex-row items-center gap-3 rounded-lg px-3 py-3 active:bg-secondary/20"
                    onPress={() => {
                      router.push("/profile");
                      onClose();
                    }}
                  >
                    <Target color={theme.colors.foreground} size={20} />
                    <Text className="font-medium text-foreground">
                      Goals & Projects
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-row items-center gap-3 rounded-lg px-3 py-3 active:bg-secondary/20"
                    onPress={() => {
                      // TODO: Navigate to AI Assistants
                      onClose();
                    }}
                  >
                    <Bot color={theme.colors.foreground} size={20} />
                    <Text className="font-medium text-foreground">
                      AI Assistants
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-row items-center gap-3 rounded-lg px-3 py-3 active:bg-secondary/20"
                    onPress={() => {
                      onClose();
                      router.push("/settings");
                    }}
                  >
                    <Settings color={theme.colors.foreground} size={20} />
                    <Text className="font-medium text-foreground">
                      Settings
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-row items-center gap-3 rounded-lg px-3 py-3 active:bg-secondary/20"
                    onPress={() => {
                      // TODO: Navigate to Help & Support
                      onClose();
                    }}
                  >
                    <HelpCircle color={theme.colors.foreground} size={20} />
                    <Text className="font-medium text-foreground">
                      Help & Support
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>

              {/* Footer / User Profile */}
              <View className="mt-4 border-border border-t pt-4">
                <TouchableOpacity
                  className="flex-row items-center gap-3 rounded-lg px-2 py-2 hover:bg-secondary/20"
                  onPress={() => {
                    router.push("/profile");
                    onClose();
                  }}
                >
                  <Avatar alt="User Avatar" className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                      <Text className="font-medium text-foreground text-xs">
                        JM
                      </Text>
                    </AvatarFallback>
                  </Avatar>
                  <View className="flex-1">
                    <Text className="font-medium text-foreground text-sm">
                      José Fernando Munguía...
                    </Text>
                  </View>
                  <View className="h-6 w-6 items-center justify-center rounded-full bg-secondary/30">
                    <Plus color={theme.colors.mutedForeground} size={14} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}
