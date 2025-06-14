import { Redirect, Tabs } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { Alert, Platform, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { getAuthContext } from "@/contexts/AuthContext";
import { getUserContext } from "@/contexts/UserContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function HomeLayout() {
  const colorScheme = useColorScheme();
  const { firebaseUser, session, isLoading } = getAuthContext();
  const { setUser, setDisplayPhoto } = getUserContext();

  const queryUser = useMemo(
    () => async (id: string) => {
      console.log("[firestore] Querying user profile");
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(JSON.parse(JSON.stringify(docSnap.data())));
        setDisplayPhoto(docSnap.data().photoURL); //user image stored in firestore
        return;
      }
      setDisplayPhoto(firebaseUser?.photoURL || null); //user google image
    },
    [firebaseUser],
  );

  useEffect(() => {
    if (firebaseUser?.uid) {
      queryUser(firebaseUser.uid);
    }
  }, []);

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
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen //make it the biggest icon with circular background
        name="run"
        options={{
          title: "Run",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="running" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: "Store",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// Styles
const styles = StyleSheet.create({
  circularButton: {
    borderRadius: 30,
    backgroundColor: "#4f8cff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // lifts the button above the tab bar
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
});
