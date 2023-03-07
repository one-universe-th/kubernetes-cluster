import axios from "axios";
import { useState, useEffect } from "react";
import type { TodoList } from "@interfaces/Todolist";
import { API_CONFIG } from "@config/api_cofig";
import { Cookies } from "react-cookie";

export interface UserData {
  user_id: string;
  todo_list: TodoList[];
}

export interface ResponseData {
  data: UserData;
  error?: any;
}

export const useTodoList = () => {
  const cookies = new Cookies();
  const [todoList, setTodoList] = useState<TodoList[]>([]);

  useEffect(() => {
    async function getTodolist() {
      const user_id = cookies.get("uid");

      const data = await axios
        .get<ResponseData>(`${API_CONFIG.baseUrl}/user/${user_id}`)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });

      setTodoList(data?.data?.todo_list as TodoList[]);
    }

    getTodolist();
  }, []);

  return { todoList };
};
