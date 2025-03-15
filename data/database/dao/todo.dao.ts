import { TodoEntity } from "@/domain/entities/TodoEntity";
import { getDb } from "../database";

export const TodoDAO = {
  insert: async (todo: TodoEntity) => {
    const db = getDb();
    await db.runAsync(
      "INSERT OR REPLACE INTO todos (id, userId, title, completed) VALUES (?, ?, ?, ?);",
      [todo.id, todo.userId, todo.title, todo.completed ? 1 : 0]
    );
  },


  getAll: async (): Promise<TodoEntity[]> => {
    const db = getDb();
    const result = await db.getAllAsync("SELECT * FROM todos");
    console.log(result[0]);
    return result as TodoEntity[];
  },
};
