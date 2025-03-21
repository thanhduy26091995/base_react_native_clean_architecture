import { container } from "@/app/config/inversify.config";
import { TodoEntity } from "@/domain/entities/TodoEntity";
import { GetTodoDetailUseCase } from "@/domain/usecases/GetTodoDetailUseCase";
import { GetTodoListUseCase } from "@/domain/usecases/GetTodoListUseCase";
import { setNotifyTodoListUpdate } from "@/utils/notifyLocalUpdate";
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
    const localTodos = await getTodoListUseCase.execute();
    set({
      todoList: localTodos,
    });

    setNotifyTodoListUpdate((todos) => {
      set({
        todoList: todos,
      });
    });
  },
}));

export const useTodoDetailStore = create<TodoDetailState>((set) => ({
  todoEntity: {} as TodoEntity,

  getTodoDetail: async (id: number) => {
    const response = await getTodoDetailUseCase.execute(id);
    set({
      todoEntity: response,
    });
  },
}));
