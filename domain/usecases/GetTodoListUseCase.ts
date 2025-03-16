import { inject, injectable } from "inversify";
import { TodoEntity } from "../entities/TodoEntity";
import { TodoRepository } from "../repositories/TodoRepository";
import { BaseUseCase } from "./BaseUseCase";
import { notifyTodoListUpdateWith } from "@/utils/notifyLocalUpdate";

@injectable()
export class GetTodoListUseCase implements BaseUseCase<TodoEntity[], void> {
  constructor(@inject private todoRepository: TodoRepository) {}

  async execute(): Promise<TodoEntity[]> {
    const localTodos = await this.todoRepository.fetchTodoListLocal();
    this.fetchAndUpdateRemoteTodos();
    return localTodos;
  }

  private async fetchAndUpdateRemoteTodos() {
    const remoteTodos = (await this.todoRepository.fetchTodoList()).map(
      (item) => {
        this.todoRepository.addTodoToLocal(item);
        return item;
      }
    );
    if (remoteTodos.length > 0) {
      notifyTodoListUpdateWith(remoteTodos);
    }
  }
}
