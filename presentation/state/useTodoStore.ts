import { container } from "@/app/config/inversify.config";
import { TodoRepositoryImpl } from "@/data/repositories/TodoRepositoryImpl";
import { TodoEntity } from "@/domain/entities/TodoEntity";
import { GetTodoListUseCase } from "@/domain/usecases/GetTodoListUseCase";
import { create } from "zustand";

interface TodoState {
  todoList: TodoEntity[];

  loadTodoList: () => Promise<void>;
}

const getTodoListUseCase =
  container.get<GetTodoListUseCase>("GetTodoListUseCase");

export const useTodoStore = create<TodoState>((set) => ({
  todoList: [],

  loadTodoList: async () => {
    const response = await getTodoListUseCase.execute();
    set({
      todoList: response
    });
  }
}));