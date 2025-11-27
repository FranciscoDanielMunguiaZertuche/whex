import type { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => (
  <SafeAreaView className="flex-1 bg-background">{children}</SafeAreaView>
);
