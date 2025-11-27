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
    typography: "hsl(0 0% 0%)",
    background: "hsl(0 0% 100%)",
    foreground: "hsl(0 0% 0%)",
    card: "hsl(0 0% 98%)",
    cardForeground: "hsl(0 0% 0%)",
    primary: "hsl(0 0% 10%)",
    primaryForeground: "hsl(0 0% 100%)",
    secondary: "hsl(0 0% 95%)",
    secondaryForeground: "hsl(0 0% 0%)",
    muted: "hsl(0 0% 96%)",
    mutedForeground: "hsl(0 0% 45%)",
    accent: "hsl(0 0% 96%)",
    accentForeground: "hsl(0 0% 0%)",
    border: "hsl(0 0% 90%)",
    input: "hsl(0 0% 90%)",
    ring: "hsl(0 0% 20%)",
  },
  spacing: sharedSpacing,
  borderRadius: sharedBorderRadius,
  fontSize: sharedFontSize,
} as const;

export const darkTheme = {
  colors: {
    ...sharedColors,
    typography: "hsl(0 0% 100%)",
    background: "hsl(0 0% 0%)",
    foreground: "hsl(0 0% 100%)",
    card: "hsl(0 0% 2%)",
    cardForeground: "hsl(0 0% 100%)",
    primary: "hsl(0 0% 90%)",
    primaryForeground: "hsl(0 0% 0%)",
    secondary: "hsl(0 0% 10%)",
    secondaryForeground: "hsl(0 0% 100%)",
    muted: "hsl(0 0% 8%)",
    mutedForeground: "hsl(0 0% 65%)",
    accent: "hsl(0 0% 8%)",
    accentForeground: "hsl(0 0% 100%)",
    border: "hsl(0 0% 15%)",
    input: "hsl(0 0% 15%)",
    ring: "hsl(0 0% 80%)",
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
