import { container } from "@/app/config/inversify.config";
import { TodoRepositoryImpl } from "@/data/repositories/TodoRepositoryImpl";
import { TodoEntity } from "@/domain/entities/TodoEntity";
import { GetTodoListUseCase } from "@/domain/usecases/GetTodoListUseCase";

interface TodoState {
  todoList: TodoEntity[];

  loadTodoList: () => Promise<void>;
}

const getTodoListUseCase =
  container.get<GetTodoListUseCase>("GetTodoListUseCase");

export const useTodoStore = (): TodoState => {
  const todoList: TodoEntity[] = [];
  const loadTodoList = async () => {
    const response = await getTodoListUseCase.execute();
    todoList.push(...response);
  };

  return {
    todoList,
    loadTodoList,
  };
};
