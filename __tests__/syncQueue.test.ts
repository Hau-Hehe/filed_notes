import { SyncEngine } from "../src/services/syncEngine";
import { StorageService } from "../src/services/storage";

describe("Sync Engine & Queue", () => {
  it("should enqueue and process sync queue operations successfully", async () => {
    const mockNote = {
      id: "test-1",
      title: "Test Note",
      content: "Inspection details",
      category: "General",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syncStatus: "pending" as const,
      retryCount: 0,
    };

    await SyncEngine.enqueueOperation("CREATE", mockNote);
    const queue = await StorageService.getSyncQueue();
    expect(queue.length).toBeGreaterThan(0);
    expect(queue[0].action).toBe("CREATE");
  });
});
