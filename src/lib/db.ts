import { openDB, type DBSchema } from 'idb';

interface MyDB extends DBSchema {
  images: {
    key: string;
    value: {
      id: string;
      dataUrl: string;
    };
  };
}

const dbPromise = openDB<MyDB>('lingua-bks-db', 2, {
  upgrade(db, oldVersion) {
    if (oldVersion < 1) {
        db.createObjectStore('images', { keyPath: 'id' });
    }
    if (oldVersion < 2) {
        if (!db.objectStoreNames.contains('images')) {
            db.createObjectStore('images', { keyPath: 'id' });
        }
    }
  },
});

export async function setImage(id: string, dataUrl: string) {
  return (await dbPromise).put('images', { id, dataUrl });
}

export async function getImage(id: string) {
  return (await dbPromise).get('images', id);
}

export async function getAllImages() {
  return (await dbPromise).getAll('images');
}
