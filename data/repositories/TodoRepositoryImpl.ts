import { TodoEntity } from "@/domain/entities/TodoEntity";
import { TodoRepository } from "@/domain/repositories/TodoRepository";
import { fetchTodoList, getTodoDetail } from "../datasources/todoApi";

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

  async getTodoDetail(id: number): Promise<TodoEntity> {
    const response = await getTodoDetail(id);
    return {
      userId: response.userId,
      id: response.id,
      title: response.title,
      completed: response.completed,
    };
  }
}
