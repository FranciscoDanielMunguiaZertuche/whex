import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
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
        Sign In
      </Text>
      <Text style={{ color: "#888", fontSize: 16, marginTop: 20 }}>
        Sign in screen works!
      </Text>
      <Link asChild href="/(auth)/sign-up">
        <TouchableOpacity style={{ marginTop: 40 }}>
          <Text style={{ color: "#0066ff", fontSize: 16 }}>Go to Sign Up</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
