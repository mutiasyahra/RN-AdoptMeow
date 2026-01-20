import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SWIPE_LIMIT = width * 0.25;
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = (CARD_WIDTH * 4) / 3;

type Cat = {
  id: string;
  name: string;
  age: string;
  emoji?: string;
  color?: string;
  desc?: string;
  image?: string | number;
};

type Props = {
  cat: Cat;
  index: number; // Posisi dalam stack (0 adalah paling atas)
  onSwipe: (id: string, direction: "left" | "right") => void;
  isTop: boolean;
};

const SwipeableCard: React.FC<Props> = ({ cat, index, onSwipe, isTop }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Shared values untuk animasi transisi stack agar tidak "meloncat"
  const animatedScale = useSharedValue(1 - index * 0.03);
  const animatedStackY = useSharedValue(index * 10);

  // Menganimasikan perpindahan posisi saat kartu di atasnya hilang
  useEffect(() => {
    animatedScale.value = withSpring(1 - index * 0.03);
    animatedStackY.value = withSpring(index * 10);
  }, [index]);

  const pan = Gesture.Pan()
    .enabled(isTop) // Hanya kartu teratas yang bisa di-drag
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(() => {
      if (Math.abs(translateX.value) > SWIPE_LIMIT) {
        const to = translateX.value > 0 ? width * 1.5 : -width * 1.5;
        const dir = translateX.value > 0 ? "right" : "left";
        translateX.value = withTiming(to, { duration: 300 });
        runOnJS(onSwipe)(cat.id, dir);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-width, 0, width],
      [-10, 0, 10]
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: isTop ? translateY.value : animatedStackY.value },
        { rotate: isTop ? `${rotate}deg` : "0deg" },
        { scale: isTop ? 1 : animatedScale.value },
      ],
      opacity: isTop ? 1 : 1 - index * 0.08,
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, animatedStyle] as any}>
        <View
          style={[styles.cardInner, { backgroundColor: cat.color || "#FFF" }]}
        >
          {cat.image ? (
            <Image
              source={
                typeof cat.image === "string" ? { uri: cat.image } : cat.image
              }
              style={styles.image}
            />
          ) : (
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>{cat.emoji || "🐱"}</Text>
            </View>
          )}
          <View style={styles.info}>
            <Text style={styles.name}>
              {cat.name}, {cat.age}
            </Text>
            <Text style={styles.desc} numberOfLines={2}>
              {cat.desc}
            </Text>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default SwipeableCard;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: "absolute",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  cardInner: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "75%",
    resizeMode: "cover",
  },
  emojiContainer: {
    width: "100%",
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 100,
  },
  info: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  name: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1F2937",
  },
  desc: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
  },
});
