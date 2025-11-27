const sharedColors = {
  success: "#22C55E",
  destructive: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
} as const;

const sharedSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

const sharedBorderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
} as const;

const sharedFontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
} as const;

export const lightTheme = {
  colors: {
    ...sharedColors,
    typography: "#000000",
    background: "#FFFFFF",
    foreground: "#000000",
    card: "#FAFAFA",
    cardForeground: "#000000",
    primary: "#1A1A1A",
    primaryForeground: "#FFFFFF",
    secondary: "#F2F2F2",
    secondaryForeground: "#000000",
    muted: "#F5F5F5",
    mutedForeground: "#737373",
    accent: "#F5F5F5",
    accentForeground: "#000000",
    border: "#E6E6E6",
    input: "#E6E6E6",
    ring: "#333333",
  },
  spacing: sharedSpacing,
  borderRadius: sharedBorderRadius,
  fontSize: sharedFontSize,
} as const;

export const darkTheme = {
  colors: {
    ...sharedColors,
    typography: "#FFFFFF",
    background: "#000000",
    foreground: "#FFFFFF",
    card: "#050505",
    cardForeground: "#FFFFFF",
    primary: "#E6E6E6",
    primaryForeground: "#000000",
    secondary: "#1A1A1A",
    secondaryForeground: "#FFFFFF",
    muted: "#141414",
    mutedForeground: "#A6A6A6",
    accent: "#141414",
    accentForeground: "#FFFFFF",
    border: "#262626",
    input: "#262626",
    ring: "#CCCCCC",
  },
  spacing: sharedSpacing,
  borderRadius: sharedBorderRadius,
  fontSize: sharedFontSize,
} as const;

// Export theme type for use in components
// Using a structural type that accepts both light and dark theme
export type Theme = {
  colors: {
    success: string;
    destructive: string;
    warning: string;
    info: string;
    typography: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    input: string;
    ring: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    "2xl": number;
    "3xl": number;
    "4xl": number;
  };
};
