import { useRouter } from "expo-router";
import { Bot, LayoutGrid, Plus, Search } from "lucide-react-native";
import { useEffect } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  TextInput,
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
              <View className="mb-6 flex-row items-center rounded-lg bg-secondary/50 px-3 py-2">
                <Search color={theme.colors.mutedForeground} size={18} />
                <TextInput
                  className="ml-2 flex-1 font-medium text-foreground"
                  placeholder="Search"
                  placeholderTextColor={theme.colors.mutedForeground}
                />
              </View>

              <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
              >
                {/* Main Menu Items */}
                <View className="mb-6 gap-1">
                  <TouchableOpacity className="flex-row items-center gap-3 rounded-lg bg-secondary/20 px-3 py-3">
                    <View className="h-6 w-6 items-center justify-center rounded-full bg-foreground">
                      <Bot color={theme.colors.background} size={14} />
                    </View>
                    <Text className="font-semibold text-foreground">
                      ChatGPT
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="flex-row items-center gap-3 rounded-lg px-3 py-3">
                    <LayoutGrid color={theme.colors.foreground} size={20} />
                    <Text className="font-medium text-foreground">Library</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="flex-row items-center gap-3 rounded-lg px-3 py-3">
                    <Bot color={theme.colors.foreground} size={20} />
                    <Text className="font-medium text-foreground">GPTs</Text>
                  </TouchableOpacity>
                </View>

                {/* Projects */}
                <View className="mb-6 gap-1">
                  <TouchableOpacity className="flex-row items-center gap-3 rounded-lg px-3 py-3">
                    <Plus color={theme.colors.foreground} size={20} />
                    <Text className="font-medium text-foreground">
                      New project
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="flex-row items-center gap-3 rounded-lg px-3 py-3">
                    <View className="h-5 w-5 items-center justify-center rounded-full border border-green-500">
                      <Text className="text-[10px] text-green-500">$</Text>
                    </View>
                    <Text className="font-medium text-foreground">
                      Investing
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* History */}
                <View className="gap-1">
                  <Text className="mb-2 px-3 font-medium text-muted-foreground text-xs">
                    Yesterday
                  </Text>
                  {[
                    "App screen order analysis",
                    "Función Booleana XOR",
                    "Create mind map frogs",
                    "Crear playlist de enfoque",
                    "Presentación de perros",
                    "Base conversions explained",
                  ].map((item) => (
                    <TouchableOpacity
                      className="rounded-lg px-3 py-2 active:bg-secondary/20"
                      key={item}
                    >
                      <Text
                        className="text-foreground/90 text-sm"
                        numberOfLines={1}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
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
                    <AvatarFallback>JM</AvatarFallback>
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
