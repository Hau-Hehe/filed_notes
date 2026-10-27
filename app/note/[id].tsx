import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { Note } from "../../src/types";
import { StorageService } from "../../src/services/storage";
import { SyncEngine } from "../../src/services/syncEngine";

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isNew = id === "new";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [location, setLocation] = useState<
    { latitude: number; longitude: number } | undefined
  >();
  const [noteObj, setNoteObj] = useState<Note | null>(null);

  useEffect(() => {
    if (!isNew) {
      StorageService.getNotes().then((notes) => {
        const found = notes.find((n) => n.id === id);
        if (found) {
          setNoteObj(found);
          setTitle(found.title);
          setContent(found.content);
          setCategory(found.category);
          setImageUri(found.imageUri);
          if (found.latitude && found.longitude) {
            setLocation({
              latitude: found.latitude,
              longitude: found.longitude,
            });
          }
        }
      });
    }
  }, [id]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      // Compress image
      const manipulated = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG },
      );
      setImageUri(manipulated.uri);
    }
  };

  const captureLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Location permission is required to tag field notes.",
      );
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
    Alert.alert("Success", "GPS coordinates attached.");
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Validation Error", "Title and content cannot be empty.");
      return;
    }

    const notes = await StorageService.getNotes();
    const now = new Date().toISOString();

    if (isNew) {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        category,
        imageUri,
        latitude: location?.latitude,
        longitude: location?.longitude,
        createdAt: now,
        updatedAt: now,
        syncStatus: "pending",
        retryCount: 0,
      };
      notes.unshift(newNote);
      await StorageService.saveNotes(notes);
      await SyncEngine.enqueueOperation("CREATE", newNote);
    } else if (noteObj) {
      const updatedNote: Note = {
        ...noteObj,
        title,
        content,
        category,
        imageUri,
        latitude: location?.latitude ?? noteObj.latitude,
        longitude: location?.longitude ?? noteObj.longitude,
        updatedAt: now,
        syncStatus: "pending",
      };
      const index = notes.findIndex((n) => n.id === id);
      if (index !== -1) notes[index] = updatedNote;
      await StorageService.saveNotes(notes);
      await SyncEngine.enqueueOperation("UPDATE", updatedNote);
    }

    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.inputTitle}
        placeholder="Note Title"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.inputContent}
        placeholder="Note content & observations..."
        placeholderTextColor="#888"
        multiline
        value={content}
        onChangeText={setContent}
      />

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={pickImage}>
          <Ionicons name="camera" size={20} color="#007aff" />
          <Text style={styles.actionText}>Attach Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={captureLocation}>
          <Ionicons name="location" size={20} color="#007aff" />
          <Text style={styles.actionText}>Tag GPS</Text>
        </TouchableOpacity>
      </View>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}
      {location && (
        <Text style={styles.locationText}>
          GPS: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </Text>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Field Note</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  inputTitle: {
    fontSize: 22,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#e5e5ea",
    paddingBottom: 8,
    marginBottom: 16,
  },
  inputContent: {
    fontSize: 16,
    height: 160,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#e5e5ea",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  actionsRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#f2f2f7",
    borderRadius: 8,
    gap: 8,
  },
  actionText: { color: "#007aff", fontWeight: "600" },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: "#34c759",
    marginBottom: 16,
    fontWeight: "500",
  },
  saveButton: {
    backgroundColor: "#007aff",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 40,
  },
  saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
