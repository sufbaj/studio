import { openDB, type DBSchema } from 'idb';

const DB_NAME = 'LinguaBKS-DB';
const STORE_NAME = 'keyval';
const DB_VERSION = 1;

interface MyDB extends DBSchema {
  [STORE_NAME]: {
    key: string;
    value: any;
  };
}

const dbPromise = openDB<MyDB>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME);
  },
});

export const db = {
  async get(key: string) {
    return (await dbPromise).get(STORE_NAME, key);
  },
  async set(key: string, val: any) {
    return (await dbPromise).put(STORE_NAME, val, key);
  },
  async del(key: string) {
    return (await dbPromise).delete(STORE_NAME, key);
  },
  async clear() {
    return (await dbPromise).clear(STORE_NAME);
  },
  async keys() {
    return (await dbPromise).getAllKeys(STORE_NAME);
  },
};
