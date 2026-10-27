import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo";
import { SyncEngine } from "../src/services/syncEngine";

export default function RootLayout() {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        SyncEngine.processQueue();
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="note/[id]"
          options={{
            presentation: "card",
            headerShown: true,
            title: "Note Details",
          }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Quick Actions" }}
        />
        <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
