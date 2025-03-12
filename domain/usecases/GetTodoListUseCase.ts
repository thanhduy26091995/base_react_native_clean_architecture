import { inject, injectable } from "inversify";
import { TodoEntity } from "../entities/TodoEntity";
import { TodoRepository } from "../repositories/TodoRepository";
import { BaseUseCase } from "./BaseUseCase";

@injectable()
export class GetTodoListUseCase implements BaseUseCase<TodoEntity[], void> {
  constructor(@inject private todoRepository: TodoRepository) {}

  async execute(): Promise<TodoEntity[]> {
    return (await this.todoRepository.fetchTodoList()).map((item) => {
      this.todoRepository.addTodoToLocal(item);
      return item;
    });
  }
}
