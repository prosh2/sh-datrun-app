import FeedComponent from "@/components/FeedComponent";
import { useSession } from "@/contexts/AuthContext";

export default function HomeScreen() {
  // const { logout } = useSession();

  return <FeedComponent />;
}

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
