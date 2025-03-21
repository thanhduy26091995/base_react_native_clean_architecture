import { TodoRepositoryImpl } from "@/data/repositories/TodoRepositoryImpl";
import { TodoRepository } from "@/domain/repositories/TodoRepository";
import { GetTodoDetailUseCase } from "@/domain/usecases/GetTodoDetailUseCase";
import { GetTodoListUseCase } from "@/domain/usecases/GetTodoListUseCase";
import { Container } from "inversify";

const container = new Container();

container.bind<TodoRepository>("TodoRepository").to(TodoRepositoryImpl);
container
  .bind<GetTodoListUseCase>("GetTodoListUseCase")
  .toDynamicValue((context) => {
    return new GetTodoListUseCase(
      context.get<TodoRepository>("TodoRepository")
    );
  });

container
  .bind<GetTodoDetailUseCase>("GetTodoDetailUseCase")
  .toDynamicValue((context) => {
    return new GetTodoDetailUseCase(
      context.get<TodoRepository>("TodoRepository")
    );
  });
export { container };
