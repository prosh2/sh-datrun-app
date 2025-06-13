import { ThemedText } from "@/components/ThemedText";
import { getAuthContext } from "@/contexts/AuthContext";
import { Redirect, Stack } from "expo-router";
import { Alert } from "react-native";

export default function ProtectedLayout() {
  const { session, isLoading } = getAuthContext();
  // You can keep the splash screen open, or render a loading screen like we do here.
  // With Expo Router, something must be rendered to the screen while loading the initial
  // auth state. In the example above, the app layout renders a loading message.
  // Alternatively, you can make the index route a loading state and move the initial route
  //  to something such as /home, which is similar to how X works.
  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    Alert.alert("You are logged out.");

    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
}
