import { useSession } from "@/contexts/AuthContext";
import { Entypo } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View } from "react-native";
import { Text } from "react-native-gesture-handler";

export function SplashScreenController() {
  const { isLoading } = useSession();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  if (isLoading) {
    return null;
  }
}
