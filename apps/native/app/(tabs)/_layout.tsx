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
          tabBarActiveTintColor: theme.colors.primary,
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
              <Ionicons color={color} name="chatbubble-outline" size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: "Tasks",
            tabBarIcon: ({ color }) => (
              <Ionicons color={color} name="checkbox-outline" size={24} />
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
              <Ionicons
                color={theme.colors.primary}
                name="add-circle"
                size={48}
                style={{ marginBottom: 4 }}
              />
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tabs.Screen
          name="notes"
          options={{
            title: "Notes",
            tabBarIcon: ({ color }) => (
              <Ionicons color={color} name="document-text-outline" size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color }) => (
              <Ionicons color={color} name="calendar-outline" size={24} />
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
