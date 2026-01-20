import { useAdoption } from "@/app/context/AdoptionContext";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";

const Orders = () => {
  const { adoptedCats, removeCat } = useAdoption();

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      entering={FadeInRight.delay(index * 100).springify()}
      exiting={FadeOutLeft}
      layout={Layout.springify()} // Animasi otomatis saat list bergeser
      style={styles.orderCard}
    >
      <Image source={item.image} style={styles.catThumbnail} />
      <View style={styles.orderInfo}>
        <Text style={styles.catName}>{item.name}</Text>
        <Text style={styles.catAge}>{item.age} • New Member</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Waiting for Pickup</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeCat(item.id)} // Batalkan adopsi
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Family</Text>
        <Text style={styles.subtitle}>List of cats you want to adopt</Text>
      </View>

      <FlatList
        data={adoptedCats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🐾</Text>
            <Text style={styles.emptyText}>Your list is empty.</Text>
            <Text style={styles.emptySubText}>
              Go to Home and swipe right to adopt!
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", paddingTop: 60 },
  header: { paddingHorizontal: 24, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "800", color: "#111827" },
  subtitle: { fontSize: 14, color: "#6B7280" },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  orderCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  catThumbnail: { width: 70, height: 70, borderRadius: 15 },
  orderInfo: { flex: 1, marginLeft: 15 },
  catName: { fontSize: 18, fontWeight: "700", color: "#1F2937" },
  catAge: { fontSize: 13, color: "#9CA3AF", marginBottom: 5 },
  statusBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  statusText: { color: "#2563EB", fontSize: 10, fontWeight: "700" },
  deleteButton: {
    width: 32,
    height: 32,
    backgroundColor: "#FEE2E2",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: { color: "#EF4444", fontWeight: "bold" },
  emptyContainer: { marginTop: 100, alignItems: "center" },
  emptyEmoji: { fontSize: 50, marginBottom: 10 },
  emptyText: { fontSize: 18, fontWeight: "700", color: "#374151" },
  emptySubText: { color: "#9CA3AF", marginTop: 5 },
});

export default Orders;
