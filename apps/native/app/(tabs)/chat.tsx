import { useLocalSearchParams } from "expo-router";
import {
  ArrowUp,
  Bot,
  ChevronDown,
  Mic,
  Plus,
  SquarePen,
  User,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "@/components/ui/menu-icon";
import { Text } from "@/components/ui/text";
import { useDrawer } from "@/lib/drawer-context";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  actions?: string[];
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Good morning! You have 3 priority tasks today. Want to review them?",
    sender: "ai",
    timestamp: new Date(),
    actions: ["Yes, show me", "Not now"],
  },
];

const AI_RESPONSE_DELAY = 1000;
const SCROLL_DELAY = 100;
const KEYBOARD_OFFSET_IOS = 90;

export default function Chat() {
  const { theme } = useTheme();
  const { openDrawer } = useDrawer();
  const { onboarding } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (onboarding === "true") {
      setMessages([
        {
          id: "welcome",
          text: "Welcome! I'm your AI productivity companion. What's the first thing on your mind?",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
  }, [onboarding]);

  const handleSend = () => {
    if (!inputText.trim()) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiMessage: Message;

      if (onboarding === "true" && messages.length === 1) {
        aiMessage = {
          id: (Date.now() + 1).toString(),
          text: "Added! I've scheduled that for you. ✓\n\nGreat start! I can help you 10x more if I know your bigger purpose and goals. Want to spend 5 minutes defining your North Star?",
          sender: "ai",
          timestamp: new Date(),
          actions: ["Start North Star", "Maybe Later"],
        };
      } else {
        aiMessage = {
          id: (Date.now() + 1).toString(),
          text: "I've added that to your tasks. Is there anything else you need help with?",
          sender: "ai",
          timestamp: new Date(),
          actions: ["View Tasks", "Add another"],
        };
      }

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, AI_RESPONSE_DELAY);
  };

  useEffect(() => {
    if (messages.length) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, SCROLL_DELAY);
    }
  }, [messages]);

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === "user";
    return (
      <View
        className={cn(
          "mb-4 flex-row",
          isUser ? "justify-end" : "justify-start"
        )}
      >
        {!isUser && (
          <View className="mr-2 h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Bot color={theme.colors.primary} size={16} />
          </View>
        )}
        <View
          className={cn(
            "max-w-[80%] rounded-2xl px-4 py-3",
            isUser ? "rounded-tr-sm bg-primary" : "rounded-tl-sm bg-muted/50"
          )}
        >
          <Text
            className={cn(
              "text-base",
              isUser ? "text-primary-foreground" : "text-foreground"
            )}
          >
            {item.text}
          </Text>
          <Text
            className={cn(
              "mt-1 self-end text-[10px]",
              isUser ? "text-primary-foreground/70" : "text-muted-foreground"
            )}
          >
            {item.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          {item.actions && !isUser && (
            <View className="mt-3 flex-row flex-wrap gap-2">
              {item.actions.map((action) => (
                <Pressable
                  className="rounded-full border border-border bg-background px-3 py-1.5 active:bg-muted"
                  key={action}
                  onPress={() => {
                    const userMsg: Message = {
                      id: Date.now().toString(),
                      text: action,
                      sender: "user",
                      timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, userMsg]);
                    // Simulate response
                    setTimeout(() => {
                      const aiMsg: Message = {
                        id: (Date.now() + 1).toString(),
                        text: `Okay, let's ${action.toLowerCase()}.`,
                        sender: "ai",
                        timestamp: new Date(),
                      };
                      setMessages((prev) => [...prev, aiMsg]);
                    }, AI_RESPONSE_DELAY);
                  }}
                >
                  <Text className="font-medium text-primary text-sm">
                    {action}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
        {isUser && (
          <View className="ml-2 h-8 w-8 items-center justify-center rounded-full bg-muted">
            <User color={theme.colors.mutedForeground} size={16} />
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between border-border/50 border-b px-4 py-2">
        <Button onPress={openDrawer} size="icon" variant="ghost">
          <MenuIcon color={theme.colors.foreground} size={24} />
        </Button>
        <Text className="font-semibold text-lg">Chat</Text>
        <View className="flex-row gap-2">
          <Button onPress={() => setMessages([])} size="icon" variant="ghost">
            <SquarePen color={theme.colors.foreground} size={24} />
          </Button>
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
        data={messages}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          isTyping ? (
            <View className="mb-4 flex-row justify-start">
              <View className="mr-2 h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Bot color={theme.colors.primary} size={16} />
              </View>
              <View className="rounded-2xl rounded-tl-sm bg-muted/50 px-4 py-3">
                <Text className="text-foreground">Thinking...</Text>
              </View>
            </View>
          ) : null
        }
        ref={flatListRef}
        renderItem={renderMessage}
        showsVerticalScrollIndicator={false}
      />

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? KEYBOARD_OFFSET_IOS : 0}
      >
        <View className="p-4 pt-2">
          <View className="rounded-[24px] border border-border bg-secondary/10 p-2">
            <TextInput
              className="max-h-32 min-h-[44px] px-4 text-base text-foreground"
              multiline
              onChangeText={setInputText}
              placeholder="Ask Whex anything..."
              placeholderTextColor={theme.colors.mutedForeground}
              value={inputText}
            />
            <View className="flex-row items-center justify-between px-2 pt-2 pb-1">
              <View className="flex-row items-center gap-2">
                <Button
                  className="h-8 w-8 rounded-full bg-muted/50"
                  size="icon"
                >
                  <Plus color={theme.colors.foreground} size={16} />
                </Button>
                <View className="flex-row items-center gap-1 rounded-full bg-muted/50 px-2 py-1">
                  <Text className="font-medium text-muted-foreground text-xs">
                    GPT-4o
                  </Text>
                  <ChevronDown color={theme.colors.mutedForeground} size={10} />
                </View>
              </View>
              <View className="flex-row items-center gap-2">
                {inputText.length > 0 ? (
                  <Button
                    className="h-8 w-8 rounded-full bg-primary"
                    onPress={handleSend}
                    size="icon"
                  >
                    <ArrowUp color={theme.colors.primaryForeground} size={16} />
                  </Button>
                ) : (
                  <Button
                    className="h-8 w-8 rounded-full bg-muted/50"
                    size="icon"
                  >
                    <Mic color={theme.colors.foreground} size={16} />
                  </Button>
                )}
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
