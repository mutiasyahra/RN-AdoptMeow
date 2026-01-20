import { AdoptionProvider } from "@/app/context/AdoptionContext"; // Sesuaikan path-nya
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AdoptionProvider>
        <Stack initialRouteName="(tabs)">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AdoptionProvider>
    </GestureHandlerRootView>
  );
}
