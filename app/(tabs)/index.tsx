import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFocusEffect, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Note, SyncStatus } from "../../src/types";
import { StorageService } from "../../src/services/storage";
import { SyncEngine } from "../../src/services/syncEngine";

export default function NotesListScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<SyncStatus | "all">("all");
  const [loading, setLoading] = useState(false);

  const loadNotes = async () => {
    setLoading(true);
    const data = await StorageService.getNotes();
    setNotes(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, []),
  );

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || note.syncStatus === filter;
    return matchesSearch && matchesFilter;
  });

  const renderSyncBadge = (status: SyncStatus) => {
    const colors = { synced: "#34c759", pending: "#ff9500", failed: "#ff3b30" };
    return (
      <View style={[styles.badge, { backgroundColor: colors[status] }]}>
        <Text style={styles.badgeText}>{status.toUpperCase()}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search field notes..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessibilityLabel="Search notes"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/note/new")}
          accessibilityRole="button"
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        {(["all", "synced", "pending", "failed"] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && styles.filterTextActive,
              ]}
            >
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={loadNotes}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No field notes found.</Text>
            <TouchableOpacity style={styles.retryButton} onPress={loadNotes}>
              <Text style={styles.retryButtonText}>Retry / Refresh</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/note/${item.id}`)}
            accessibilityRole="button"
          >
            {item.imageUri && (
              <Image source={{ uri: item.imageUri }} style={styles.cardImage} />
            )}
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {renderSyncBadge(item.syncStatus)}
              </View>
              <Text style={styles.cardSnippet} numberOfLines={2}>
                {item.content}
              </Text>
              <Text style={styles.cardDate}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f7", padding: 16 },
  headerRow: { flexDirection: "row", marginBottom: 12, gap: 8 },
  searchBar: {
    flex: 1,
    height: 46,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e5e5ea",
  },
  addButton: {
    width: 46,
    height: 46,
    backgroundColor: "#007aff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  filterRow: { flexDirection: "row", marginBottom: 12, gap: 6 },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#e5e5ea",
  },
  filterChipActive: { backgroundColor: "#007aff" },
  filterText: { fontSize: 12, fontWeight: "600", color: "#3a3a3c" },
  filterTextActive: { color: "#fff" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e5ea",
  },
  cardImage: { width: "100%", height: 140 },
  cardContent: { padding: 12 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#1c1c1e", flex: 1 },
  cardSnippet: { fontSize: 14, color: "#3a3a3c", marginBottom: 6 },
  cardDate: { fontSize: 12, color: "#8e8e93" },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 64,
  },
  emptyText: {
    color: "#8e8e93",
    fontSize: 16,
    marginTop: 12,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#007aff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: { color: "#fff", fontWeight: "600" },
});
