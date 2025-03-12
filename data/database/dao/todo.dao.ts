import { TodoEntity } from "@/domain/entities/TodoEntity";
import { getDb } from "../database";

export const TodoDAO = {
  insert: async (todo: TodoEntity) => {
    const db = getDb();
    await db.runAsync("INSERT INTO todos (title, completed) VALUES (?, ?);", [
      todo.title,
      todo.completed ? 1 : 0,
    ]);
  },

  getAll: async (): Promise<TodoEntity[]> => {
    const db = getDb();
    const result = await db.getAllAsync("SELECT * FROM todos");
    console.log(result);
    return result as TodoEntity[];
  },
};
