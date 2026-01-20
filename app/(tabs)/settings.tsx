import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const SettingItem = ({
  icon,
  title,
  value,
  type = "chevron",
  color,
  onPress,
}: any) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      if (onPress && typeof onPress === "function") return onPress();
      Alert.alert("Pemberitahuan", "Fitur ini masih dalam tahap pengembangan");
    }}
  >
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <Text style={styles.iconText}>{icon}</Text>
    </View>
    <Text style={styles.itemTitle}>{title}</Text>
    <View style={styles.itemRight}>
      {type === "switch" ? (
        <Switch
          value={value}
          trackColor={{ true: "#10B981" }}
          onValueChange={() =>
            Alert.alert(
              "Notifikasi",
              "Fitur ini masih dalam tahap pengembangan"
            )
          }
        />
      ) : (
        <Text style={styles.chevron}>›</Text>
      )}
    </View>
  </TouchableOpacity>
);

const Settings = () => {
  const devAlert = () =>
    Alert.alert("Notifikasi", "Fitur ini masih dalam tahap pengembangan");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Animated.View
        entering={FadeIn.duration(800)}
        style={styles.profileSection}
      >
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarEmoji}>👤</Text>
        </View>
        <Text style={styles.userName}>Cat Lover</Text>
        <Text style={styles.userEmail}>meow@example.com</Text>
        <TouchableOpacity style={styles.editButton} onPress={devAlert}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Preferences</Text>
        <View style={styles.card}>
          <SettingItem
            icon="🔔"
            title="Notifications"
            color="#6366F1"
            type="switch"
            value={true}
          />
          <View style={styles.divider} />
          <SettingItem icon="📍" title="Location Range" color="#F59E0B" />
          <View style={styles.divider} />
          <SettingItem icon="🐱" title="Cat Breed Filter" color="#EC4899" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Account</Text>
        <View style={styles.card}>
          <SettingItem icon="💳" title="Donation Methods" color="#10B981" />
          <View style={styles.divider} />
          <SettingItem icon="🛡️" title="Privacy Policy" color="#6B7280" />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={devAlert}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>MeowDopt v1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  profileSection: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#FFF",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarEmoji: { fontSize: 50 },
  userName: { fontSize: 22, fontWeight: "800", color: "#111827" },
  userEmail: { fontSize: 14, color: "#6B7280", marginBottom: 16 },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  editButtonText: { fontSize: 14, fontWeight: "600", color: "#374151" },
  section: { marginTop: 24, paddingHorizontal: 20 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9CA3AF",
    marginBottom: 8,
    textTransform: "uppercase",
    marginLeft: 4,
  },
  card: { backgroundColor: "#FFF", borderRadius: 16, overflow: "hidden" },
  item: { flexDirection: "row", alignItems: "center", padding: 16 },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: { fontSize: 18 },
  itemTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  itemRight: { flexDirection: "row", alignItems: "center" },
  chevron: { fontSize: 24, color: "#D1D5DB" },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginLeft: 60 },
  logoutButton: {
    marginTop: 40,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
  },
  logoutText: { color: "#EF4444", fontWeight: "700", fontSize: 16 },
  versionText: {
    textAlign: "center",
    marginTop: 12,
    marginBottom: 12,
    color: "#9CA3AF",
    fontSize: 12,
  },
});

export default Settings;
