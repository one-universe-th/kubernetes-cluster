import axios from "axios";
import { Cookies } from "react-cookie";
import { API_CONFIG } from "@config/api_cofig";
import { TodoList } from "@interfaces/Todolist";

export const useCompleteTodo = (todo: TodoList) => {
  const uid = new Cookies().get("uid");

  const updateComplete = async () => {
    await axios
      .put(`${API_CONFIG.baseUrl}/todo/${uid}`, {
        ...todo,
        complete: !todo.completed,
      })
      .then((res) => res.data);
  };

  updateComplete();
};
