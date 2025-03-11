import { inject, injectable } from "inversify";
import { TodoEntity } from "../entities/TodoEntity";
import { BaseUseCase } from "./BaseUseCase";
import { TodoRepository } from "../repositories/TodoRepository";

@injectable()
export class GetTodoDetailUseCase implements BaseUseCase<TodoEntity, number> {
  constructor(@inject private todoRepository: TodoRepository) {}

  async execute(id: number): Promise<TodoEntity> {
    return this.todoRepository.getTodoDetail(id);
  }
}
