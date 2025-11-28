import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import Constants from "expo-constants";
import { getItemAsync, setItemAsync } from "expo-secure-store";

// Storage adapter using expo-secure-store with required sync interface
// The expoClient internally handles the async nature
const storage = {
  getItem: getItemAsync as unknown as (key: string) => string | null,
  setItem: setItemAsync as unknown as (key: string, value: string) => void,
};

// Get the scheme from app config (can be string or string[])
const getScheme = (): string => {
  const scheme = Constants.expoConfig?.scheme;
  if (Array.isArray(scheme)) {
    return scheme[0] ?? "whex";
  }
  return scheme ?? "whex";
};

// Get server URL from environment or fallback
const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL ?? "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: serverUrl,
  plugins: [
    expoClient({
      scheme: getScheme(),
      storagePrefix: getScheme(),
      storage,
    }),
  ],
});
