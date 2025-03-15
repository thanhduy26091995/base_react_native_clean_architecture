import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export const initializeDatabase = async () => {
  db = await SQLite.openDatabaseAsync("todo.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY, 
      title TEXT NOT NULL, 
      completed INTEGER DEFAULT 0
    );
  `);
};

export const migrateDbIfNeeded = async () => {
  db = await SQLite.openDatabaseAsync("todo.db");
  const DATABASE_VERSION = 1;

  let { user_version: currentDbVersion } = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  console.log(currentDbVersion);

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  // Add migration here
  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';

      CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY, 
      userId TEXT NOT NULL,
      title TEXT NOT NULL, 
      completed INTEGER DEFAULT 0
    );
      `);
    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};

export const getDb = () => {
  if (!db) {
    throw new Error("Database not initialized. Call initializeDatabase first.");
  }
  return db;
};