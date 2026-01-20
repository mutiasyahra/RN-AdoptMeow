import { useAdoption } from "@/app/context/AdoptionContext";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SwipeableCard from "./SwipeableCard";

const { width } = Dimensions.get("window");

// Data dummy awal
const initialCats = () => [
  {
    id: "1",
    name: "Mochi",
    age: "2y",
    emoji: "🐾",
    color: "#FDE68A",
    desc: "Loves naps.",
    image: require("@/assets/images/1.webp"),
  },
  {
    id: "2",
    name: "Pixel",
    age: "1y",
    emoji: "😺",
    color: "#FBCFE8",
    desc: "Curious.",
    image: require("@/assets/images/2.jpg"),
  },
  {
    id: "3",
    name: "Luca",
    age: "3y",
    emoji: "🌥️",
    color: "#BFDBFE",
    desc: "Gentle.",
    image: require("@/assets/images/3.jpg"),
  },
  {
    id: "4",
    name: "Sushi",
    age: "4y",
    emoji: "S",
    color: "#C7F9CC",
    desc: "Sweet.",
    image: require("@/assets/images/4.webp"),
  },
  {
    id: "5",
    name: "Jinx",
    age: "6m",
    emoji: "🪄",
    color: "#FED7AA",
    desc: "Tiny mischief-maker.",
    image: require("@/assets/images/5.jpg"),
  },
];

const CatDeck: React.FC = () => {
  const { adoptCat } = useAdoption();
  const [cards, setCards] = useState(initialCats()); // Menjalankan fungsi initialCats
  const [feedback, setFeedback] = useState<{
    type: "left" | "right";
    name: string;
  } | null>(null);
  const feedbackOpacity = useSharedValue(0);

  const showFeedback = (type: "left" | "right", name: string) => {
    setFeedback({ type, name });
    feedbackOpacity.value = withTiming(1, { duration: 200 });
    setTimeout(() => {
      feedbackOpacity.value = withTiming(0, { duration: 300 });
      setTimeout(() => setFeedback(null), 350);
    }, 900);
  };

  const onSwipe = (id: string, dir: "left" | "right") => {
    const cat = cards.find((c) => c.id === id);

    if (cat && dir === "right") {
      adoptCat(cat);
    }

    setCards((prev) => prev.filter((c) => c.id !== id));
    if (cat) showFeedback(dir, cat.name);
  };

  const topThree = useMemo(() => cards.slice(0, 3), [cards]);
  const feedbackStyle = useAnimatedStyle(() => ({
    opacity: feedbackOpacity.value,
    transform: [{ scale: feedbackOpacity.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.deckContainer}>
        {cards.length > 0 ? (
          <>
            {topThree
              .map((cat, i) => (
                <SwipeableCard
                  key={cat.id}
                  cat={cat}
                  index={i}
                  isTop={i === 0}
                  onSwipe={onSwipe}
                />
              ))
              .reverse()}

            {feedback && (
              <Animated.View
                style={[styles.feedback, feedbackStyle]}
                pointerEvents="none"
              >
                <Text style={styles.feedbackText}>
                  {feedback.type === "right" ? "💖 Adopted" : "✖ Skipped"}
                </Text>
                <Text style={styles.feedbackName}>{feedback.name}</Text>
              </Animated.View>
            )}
          </>
        ) : (
          /* TAMPILAN JIKA KARTU HABIS */
          <Animated.View
            entering={FadeIn.duration(600)}
            style={styles.emptyContainer}
          >
            <Text style={styles.emptyEmoji}>✨</Text>
            <Text style={styles.emptyTitle}>Semua Kucing Terpilih!</Text>
            <Text style={styles.emptySub}>
              Tidak ada lagi kucing untuk saat ini. Cek daftar adopsimu di tab{" "}
              <Text style={{ fontWeight: "bold", color: "#4F46E5" }}>
                Orders
              </Text>
              .
            </Text>
            <TouchableOpacity
              style={styles.refreshBtn}
              onPress={() => setCards(initialCats())}
            >
              <Text style={styles.refreshText}>Lihat Lagi</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      {/* Kontrol tombol hanya muncul jika kartu masih ada */}
      {cards.length > 0 && (
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.roundButton, { backgroundColor: "#EF4444" }]}
            onPress={() => cards[0] && onSwipe(cards[0].id, "left")}
          >
            <Text style={styles.buttonIcon}>✕</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roundButton, { backgroundColor: "#10B981" }]}
            onPress={() => cards[0] && onSwipe(cards[0].id, "right")}
          >
            <Text style={styles.buttonIcon}>❤</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  deckContainer: {
    width: "100%",
    height: ((width - 40) * 4) / 3 + 40,
    alignItems: "center",
    justifyContent: "center",
  },
  feedback: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  feedbackText: { color: "#fff", fontSize: 20, fontWeight: "800" },
  feedbackName: { color: "#fff", marginTop: 4 },
  controls: { flexDirection: "row", marginTop: 40, gap: 40 },
  roundButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonIcon: { color: "white", fontSize: 28, fontWeight: "bold" },
  // Styles untuk Empty State
  emptyContainer: { alignItems: "center", paddingHorizontal: 40 },
  emptyEmoji: { fontSize: 60, marginBottom: 10 },
  emptyTitle: { fontSize: 22, fontWeight: "800", color: "#1F2937" },
  emptySub: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 10,
    lineHeight: 22,
  },
  refreshBtn: {
    marginTop: 25,
    backgroundColor: "#4F46E5",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  refreshText: { color: "white", fontWeight: "bold" },
});

export default CatDeck;
