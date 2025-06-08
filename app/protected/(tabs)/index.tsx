import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { useSession } from "@/contexts/AuthContext";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { FlatList, Text } from "react-native-gesture-handler";
import { samplePosts } from "@/constants/Data";
import { Post } from "@/components/model/Post";

export default function HomeScreen() {
  const { signOut } = useSession();
  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <FontAwesome5 name="running" size={24} color="#ff6b00" />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Image source={item.photo} style={styles.image} />
      <Text style={styles.caption}>{item.caption}</Text>
      <View style={styles.stats}>
        <Text style={styles.statText}>🏃 {item.distance}</Text>
        <Text style={styles.statText}>⏱️ {item.time}</Text>
        <Text style={styles.statText}>📍 {item.location}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity>
          <AntDesign name="like2" size={20} color="#555">
          <Text>{item.likes}</Text>
          </AntDesign>
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="message1"
            size={20}
            color="#555"
            style={{ marginLeft: 16 }}
          >
            <Text>{item.comments}</Text>
          </AntDesign>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Feed</Text>
      <FlatList
        data={samplePosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  name: { fontSize: 16, fontWeight: "bold", marginLeft: 8 },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  caption: { fontSize: 14, marginBottom: 8, color: "#333" },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statText: { fontSize: 12, color: "#666" },
  actions: { flexDirection: "row" },
});
