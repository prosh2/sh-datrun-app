import { getAuthContext } from "@/contexts/AuthContext";
import * as SplashScreen from "expo-splash-screen";

export function SplashScreenController() {
  const { isLoading } = getAuthContext();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  if (isLoading) {
    return null;
  }
}
