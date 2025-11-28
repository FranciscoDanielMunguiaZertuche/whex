import { View } from "react-native";
import { cn } from "@/lib/utils";

interface MenuIconProps {
  color: string;
  size?: number;
  className?: string;
}

export const MenuIcon = ({ color, size = 24, className }: MenuIconProps) => {
  const strokeWidth = Math.max(2, size * 0.12);
  const topPadding = size * 0.12;
  const sidePadding = size * 0.08;
  const lines = [size * 0.78, size * 0.78, size * 0.6];

  return (
    <View
      className={cn(className)}
      style={{
        width: size,
        height: size,
        paddingTop: topPadding,
        paddingBottom: topPadding,
        paddingLeft: sidePadding,
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      {lines.map((lineWidth, index) => (
        <View
          key={index}
          style={{
            width: lineWidth,
            height: strokeWidth,
            backgroundColor: color,
            borderRadius: strokeWidth,
          }}
        />
      ))}
    </View>
  );
};
