import { useSession } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";
import React from "react";

export default function Index() {
  const { session } = useSession();

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }
  return <Redirect href="/(protected)/(tabs)" />;
}
