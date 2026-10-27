import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note, SyncQueueItem } from "../types";

const NOTES_KEY = "@field_notes_data";
const QUEUE_KEY = "@field_notes_sync_queue";

export const StorageService = {
  async getNotes(): Promise<Note[]> {
    try {
      const data = await AsyncStorage.getItem(NOTES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load notes", error);
      return [];
    }
  },

  async saveNotes(notes: Note[]): Promise<void> {
    try {
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error("Failed to save notes", error);
    }
  },

  async getSyncQueue(): Promise<SyncQueueItem[]> {
    try {
      const data = await AsyncStorage.getItem(QUEUE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load sync queue", error);
      return [];
    }
  },

  async saveSyncQueue(queue: SyncQueueItem[]): Promise<void> {
    try {
      await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    } catch (error) {
      console.error("Failed to save sync queue", error);
    }
  },
};
