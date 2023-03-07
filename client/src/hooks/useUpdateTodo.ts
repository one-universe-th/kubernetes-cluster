import axios from "axios";
import { Cookies } from "react-cookie";
import { API_CONFIG } from "@config/api_cofig";
import { TodoList } from "@interfaces/Todolist";

export const useUpdateTodo = (todo: TodoList) => {
  const uid = new Cookies().get("uid");

  const updateTodo = async () => {
    await axios
      .put(`${API_CONFIG.baseUrl}/todo/${uid}`, {
        ...todo,
      })
      .then((res) => res.data);
  };

  updateTodo();
};
