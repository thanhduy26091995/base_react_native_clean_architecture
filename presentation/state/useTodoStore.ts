import { container } from "@/app/config/inversify.config";
import { TodoEntity } from "@/domain/entities/TodoEntity";
import { GetTodoDetailUseCase } from "@/domain/usecases/GetTodoDetailUseCase";
import { GetTodoListUseCase } from "@/domain/usecases/GetTodoListUseCase";
import { create } from "zustand";

interface TodoState {
  todoList: TodoEntity[];

  loadTodoList: () => Promise<void>;
}

interface TodoDetailState {
  todoEntity: TodoEntity;

  getTodoDetail: (id: number) => Promise<void>;
}

const getTodoListUseCase =
  container.get<GetTodoListUseCase>("GetTodoListUseCase");
const getTodoDetailUseCase = container.get<GetTodoDetailUseCase>(
  "GetTodoDetailUseCase"
);

export const useTodoStore = create<TodoState>((set) => ({
  todoList: [],

  loadTodoList: async () => {
    const response = await getTodoListUseCase.execute();
    set({
      todoList: response,
    });
  },
}));
