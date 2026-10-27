import { StorageService } from "../src/services/storage";
import { Note } from "../src/types";

describe("Storage Service", () => {
  it("should save and retrieve notes correctly", async () => {
    const notes: Note[] = [
      {
        id: "123",
        title: "Sample",
        content: "Content",
        category: "Test",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        syncStatus: "synced",
        retryCount: 0,
      },
    ];

    await StorageService.saveNotes(notes);
    const retrieved = await StorageService.getNotes();
    expect(retrieved.length).toBe(1);
    expect(retrieved[0].title).toBe("Sample");
  });
});
