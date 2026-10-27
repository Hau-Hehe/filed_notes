export type SyncStatus = "synced" | "pending" | "failed";

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  latitude?: number;
  longitude?: number;
  imageUri?: string;
  createdAt: string;
  updatedAt: string;
  syncStatus: SyncStatus;
  retryCount: number;
}

export interface SyncQueueItem {
  id: string;
  action: "CREATE" | "UPDATE" | "DELETE";
  payload: Note;
  timestamp: number;
  attempts: number;
}

export interface User {
  username: string;
  token: string;
}
