import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { ChatDrawer } from "@/components/chat-drawer";
import { DrawerProvider, useDrawer } from "@/lib/drawer-context";
import { useTheme } from "@/lib/theme-context";

function TabLayoutContent() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isOpen, closeDrawer } = useDrawer();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.info,
          tabBarInactiveTintColor: theme.colors.mutedForeground,
          tabBarStyle: {
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.border,
          },
        }}
      >
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ color }) => (
              <Ionicons color={color} name="chatbubble" size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="today"
          options={{
            title: "Today",
            tabBarIcon: ({ color }) => (
              <Ionicons color={color} name="sunny" size={24} />
            ),
          }}
        />
        <Tabs.Screen
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              router.push("/modal");
            },
          })}
          name="create"
          options={{
            title: "",
            tabBarIcon: () => (
              <Ionicons color={theme.colors.info} name="add-circle" size={32} />
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color }) => (
              <Ionicons color={color} name="calendar" size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "You",
            tabBarIcon: ({ color }) => (
              <Ionicons color={color} name="person" size={24} />
            ),
          }}
        />
      </Tabs>
      <ChatDrawer isOpen={isOpen} onClose={closeDrawer} />
    </>
  );
}

export default function TabLayout() {
  return (
    <DrawerProvider>
      <TabLayoutContent />
    </DrawerProvider>
  );
}
