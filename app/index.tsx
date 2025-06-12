import { useSession } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";
import React from "react";
import { Alert } from "react-native";

export default function Index() {
  const { session } = useSession();

  if (!session) {
    Alert.alert("You are not signed in.");
    return <Redirect href="/(auth)/login" />;
  }
  return <Redirect href="/(protected)/(tabs)" />;
}
