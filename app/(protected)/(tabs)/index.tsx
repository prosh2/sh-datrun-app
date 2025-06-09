import FeedComponent from "@/components/FeedComponent";
import { useSession } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";

export default function HomeScreen() {
  const { user } = useSession();
  const fallbackPhoto = require("../../../assets/images/favicon.png");
  const photoURL = user?.photoURL;

  return (
    <>
      <View style={styles.titleContainer}>
        <Pressable onPress={() => router.push("/(protected)/profile")}>
          <Image
            source={photoURL ? { uri: photoURL } : fallbackPhoto}
            style={styles.avatar}
          />
        </Pressable>
      </View>
      <FeedComponent />
    </>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    position: "absolute",
    left: 20,
    top: 40,
    zIndex: 100,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
  },
});
// return (
//   <ParallaxScrollView
//     headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
//     headerImage={
//       <Image
//         source={require("@/assets/images/partial-react-logo.png")}
//         style={styles.reactLogo}
//       />
//     }
//   >
//     <ThemedView style={styles.titleContainer}>
//       <ThemedText type="title">Home Page!</ThemedText>
//       <HelloWave />
//     </ThemedView>
//     <ThemedView style={styles.stepContainer}>

//       <ThemedText
//         onPress={() => {
//           // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
//           signOut();
//         }}>
//         Sign Out
//       </ThemedText>
//       <ThemedText>Click to navigate to nested route</ThemedText>
//       <Link href="/protected/profile">Navigate to nested route</Link>
//     </ThemedView>
//   </ParallaxScrollView>
// );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// });
