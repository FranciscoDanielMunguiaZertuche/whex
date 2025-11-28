import { View } from "react-native";
import { cn } from "@/lib/utils";

interface MenuIconProps {
  color: string;
  size?: number;
  className?: string;
}

export const MenuIcon = ({ color, size = 24, className }: MenuIconProps) => {
  const lineWidth = size * 0.7;
  const lineHeight = 2.5;
  const lineGap = 3.5;
  const borderRadius = lineHeight / 2;

  return (
    <View
      className={cn("justify-center", className)}
      style={{
        width: size,
        height: size,
        paddingLeft: (size - lineWidth) / 2,
      }}
    >
      <View
        style={{
          width: lineWidth,
          height: lineHeight,
          backgroundColor: color,
          borderRadius,
        }}
      />
      <View style={{ height: lineGap }} />
      <View
        style={{
          width: lineWidth,
          height: lineHeight,
          backgroundColor: color,
          borderRadius,
        }}
      />
      <View style={{ height: lineGap }} />
      <View
        style={{
          width: lineWidth * 0.6,
          height: lineHeight,
          backgroundColor: color,
          borderRadius,
        }}
      />
    </View>
  );
};
