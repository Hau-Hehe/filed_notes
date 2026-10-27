import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useFocusEffect } from "expo-router";
import { Note } from "../../src/types";
import { StorageService } from "../../src/services/storage";

export default function MapScreen() {
  const [notes, setNotes] = useState<Note[]>([]);

  useFocusEffect(
    useCallback(() => {
      StorageService.getNotes().then(setNotes);
    }, []),
  );

  const notesWithLocation = notes.filter((n) => n.latitude && n.longitude);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.9572, // DNTU / Bien Hoa region
          longitude: 106.8427,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {notesWithLocation.map((note) => (
          <Marker
            key={note.id}
            coordinate={{
              latitude: note.latitude!,
              longitude: note.longitude!,
            }}
            title={note.title}
            description={note.content}
          />
        ))}
      </MapView>
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>
          {notesWithLocation.length} Geotagged Notes
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  overlay: {
    position: "absolute",
    top: 16,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  overlayText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});
