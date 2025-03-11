import { AppConfig } from "@/app/config/appConfig";
import axios from "axios";

const httpClient = axios.create({
  baseURL: AppConfig.apiBaseUrl,
  timeout: 10000,
});

export const fetchTodoList = async () => {
  const response = await httpClient.get("/todos");
  return response.data as TodoResponse[];
};

export const getTodoDetail = async(id: number) => {
  const response = await httpClient.get(`/todos/${id}`);
  return response.data as TodoResponse;
}