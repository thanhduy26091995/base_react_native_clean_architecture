import { TodoEntity } from "@/domain/entities/TodoEntity";

let notifyTodoListUpdate: (todos: TodoEntity[]) => void = () => {};

export function setNotifyTodoListUpdate(
  callback: (todos: TodoEntity[]) => void
) {
  notifyTodoListUpdate = callback;
}

export function notifyTodoListUpdateWith(todos: TodoEntity[]) {
  notifyTodoListUpdate(todos);
}
