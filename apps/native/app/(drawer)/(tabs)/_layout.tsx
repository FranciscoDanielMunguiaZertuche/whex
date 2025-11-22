import { Tabs, useRouter } from "expo-router";
import { useUnistyles } from "react-native-unistyles";

import { TabBarIcon } from "@/components/tabbar-icon";

export default function TabLayout() {
  const { theme } = useUnistyles();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          tabBarIcon: ({ color }) => <TabBarIcon color={color} name="sun" />,
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
            <TabBarIcon
              color={theme.colors.primary}
              name="plus-circle"
              size={32}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color} name="calendar" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "You",
          tabBarIcon: ({ color }) => <TabBarIcon color={color} name="user" />,
        }}
      />
    </Tabs>
  );
}
