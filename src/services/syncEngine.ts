import NetInfo from "@react-native-community/netinfo";
import { StorageService } from "./storage";
import { Note, SyncQueueItem } from "../types";

export const SyncEngine = {
  async enqueueOperation(action: "CREATE" | "UPDATE" | "DELETE", note: Note) {
    const queue = await StorageService.getSyncQueue();
    const newItem: SyncQueueItem = {
      id: `${note.id}-${Date.now()}`,
      action,
      payload: note,
      timestamp: Date.now(),
      attempts: 0,
    };
    queue.push(newItem);
    await StorageService.saveSyncQueue(queue);
    this.processQueue();
  },

  async processQueue(): Promise<void> {
    const netState = await NetInfo.fetch();
    if (!netState.isConnected) return;

    let queue = await StorageService.getSyncQueue();
    if (queue.length === 0) return;

    const remainingQueue: SyncQueueItem[] = [];
    const notes = await StorageService.getNotes();

    for (const item of queue) {
      try {
        // Simulate API network call sync with remote server
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() < 0.15) reject(new Error("Network timeout"));
            else resolve(true);
          }, 600);
        });

        // Update note status to synced locally
        const noteIndex = notes.findIndex((n) => n.id === item.payload.id);
        if (noteIndex !== -1 && item.action !== "DELETE") {
          notes[noteIndex].syncStatus = "synced";
          notes[noteIndex].retryCount = 0;
        } else if (item.action === "DELETE") {
          const filtered = notes.filter((n) => n.id !== item.payload.id);
          notes.splice(0, notes.length, ...filtered);
        }
      } catch (error) {
        item.attempts += 1;
        if (item.attempts < 3) {
          remainingQueue.push(item);
        } else {
          // Mark as failed after 3 max retries
          const noteIndex = notes.findIndex((n) => n.id === item.payload.id);
          if (noteIndex !== -1) {
            notes[noteIndex].syncStatus = "failed";
            notes[noteIndex].retryCount = item.attempts;
          }
        }
      }
    }

    await StorageService.saveNotes(notes);
    await StorageService.saveSyncQueue(remainingQueue);
  },
};
