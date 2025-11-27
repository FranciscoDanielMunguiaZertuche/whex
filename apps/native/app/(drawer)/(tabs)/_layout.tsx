import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0066ff",
        tabBarInactiveTintColor: "#888888",
        tabBarStyle: {
          backgroundColor: "#1a1a1a",
          borderTopColor: "#333333",
        },
      }}
    >
      <Tabs.Screen
        name="index"
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
            <Ionicons color="#0066ff" name="add-circle" size={32} />
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
  );
}
