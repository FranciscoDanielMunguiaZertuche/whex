import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1a1a1a",
        padding: 20,
        paddingTop: 100,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 28, fontWeight: "bold" }}>
        Sign Up
      </Text>
      <Text style={{ color: "#888", fontSize: 16, marginTop: 20 }}>
        Sign up screen works!
      </Text>
      <Link asChild href="/(auth)/sign-in">
        <TouchableOpacity style={{ marginTop: 40 }}>
          <Text style={{ color: "#0066ff", fontSize: 16 }}>Go to Sign In</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
