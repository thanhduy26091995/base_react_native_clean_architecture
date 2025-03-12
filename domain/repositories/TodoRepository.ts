import { TodoEntity } from "../entities/TodoEntity";

export interface TodoRepository {
  fetchTodoList(): Promise<TodoEntity[]>;
  getTodoDetail(id: number): Promise<TodoEntity>;
  addTodoToLocal(todo: TodoEntity): Promise<void>;
  fetchTodoListLocal(): Promise<TodoEntity[]>;
}
