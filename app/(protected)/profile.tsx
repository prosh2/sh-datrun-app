import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ThemedText type="title">Profile Page!</ThemedText>
      <HelloWave />
    </View>
  );
}

const styles = StyleSheet.create({});
