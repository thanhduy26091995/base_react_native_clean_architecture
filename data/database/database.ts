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

export const getDb = () => {
  if (!db) {
    throw new Error("Database not initialized. Call initializeDatabase first.");
  }
  return db;
};