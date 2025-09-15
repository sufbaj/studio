import { openDB, type DBSchema } from 'idb';

const DB_NAME = 'lingua-bks-db';
const DB_VERSION = 1;
const STORE_NAME = 'alphabet-images';

interface MyDB extends DBSchema {
  [STORE_NAME]: {
    key: string;
    value: string; // Base64 data URL
  };
}

const dbPromise = openDB<MyDB>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME);
    }
  },
});

export async function setImage(key: string, value: string): Promise<void> {
  try {
    const db = await dbPromise;
    await db.put(STORE_NAME, value, key);
  } catch (error) {
    console.error('Failed to set image in IndexedDB:', error);
  }
}

export async function getImage(key: string): Promise<string | undefined> {
  try {
    const db = await dbPromise;
    return await db.get(STORE_NAME, key);
  } catch (error) {
    console.error('Failed to get image from IndexedDB:', error);
    return undefined;
  }
}

export async function getImages(keys: string[]): Promise<Record<string, string>> {
  try {
    const db = await dbPromise;
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const results: Record<string, string> = {};
    await Promise.all(
      keys.map(async (key) => {
        const value = await store.get(key);
        if (value) {
          results[key] = value;
        }
      })
    );
    await tx.done;
    return results;
  } catch (error) {
    console.error('Failed to get multiple images from IndexedDB:', error);
    return {};
  }
}
