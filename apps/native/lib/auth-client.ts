import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import Constants from "expo-constants";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

const secureStoreStorage = {
  deleteItemAsync,
  getItemAsync,
  setItemAsync,
};

// Get server URL from environment or fallback
const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL ?? "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: serverUrl,
  plugins: [
    expoClient({
      scheme: Constants.expoConfig?.scheme ?? "mybettertapp",
      storagePrefix: Constants.expoConfig?.scheme ?? "mybettertapp",
      storage: secureStoreStorage,
    }),
  ],
});
