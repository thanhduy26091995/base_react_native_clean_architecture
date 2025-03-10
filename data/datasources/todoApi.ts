import { AppConfig } from "@/app/config/appConfig";
import axios from "axios";

const httpClient = axios.create({
  baseURL: AppConfig.apiBaseUrl,
  timeout: 10000,
});

export const fetchTodoList = async () => {
  const response = await httpClient.get("/todos");
  console.log("Response: ", response.data.length);
  return response.data as TodoResponse[];
};
