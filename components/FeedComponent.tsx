import { samplePosts } from "@/constants/Data";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { Post } from "./model/Post";
import { FlatList, Text } from "react-native-gesture-handler";

export default function FeedComponent() {
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
        <Text style={styles.statText}>⏱️ {item.datetime}</Text>
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
