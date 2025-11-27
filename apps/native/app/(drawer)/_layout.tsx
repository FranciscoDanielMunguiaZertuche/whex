import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

const DrawerLayout = () => (
  <Drawer
    screenOptions={{
      headerStyle: {
        backgroundColor: "#1a1a1a",
      },
      headerTitleStyle: {
        color: "#ffffff",
      },
      headerTintColor: "#ffffff",
      drawerStyle: {
        backgroundColor: "#1a1a1a",
      },
      drawerLabelStyle: {
        color: "#ffffff",
      },
      drawerInactiveTintColor: "#888888",
    }}
  >
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: "Home",
        drawerLabel: "Home",
        drawerIcon: ({ size, color }) => (
          <Ionicons color={color} name="home-outline" size={size} />
        ),
      }}
    />
    <Drawer.Screen
      name="(tabs)"
      options={{
        headerTitle: "Tabs",
        drawerLabel: "Tabs",
        drawerIcon: ({ size, color }) => (
          <MaterialIcons color={color} name="border-bottom" size={size} />
        ),
      }}
    />
  </Drawer>
);

export default DrawerLayout;
