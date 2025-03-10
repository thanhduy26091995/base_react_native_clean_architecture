import { TodoEntity } from "@/domain/entities/TodoEntity";
import { TodoRepository } from "@/domain/repositories/TodoRepository";
import { fetchTodoList } from "../datasources/todoApi";

export class TodoRepositoryImpl implements TodoRepository {
  async fetchTodoList(): Promise<TodoEntity[]> {
    const todoResponse = await fetchTodoList();
    return todoResponse.map((todo) => ({
      userId: todo.userId,
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    }));
  }
}
