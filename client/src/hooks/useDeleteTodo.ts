import axios from "axios";
import { Cookies } from "react-cookie";
import { API_CONFIG } from "@config/api_cofig";

export const useDeleteTodo = (todo_id: string) => {
  const uid = new Cookies().get("uid");

  const deleteTodo = async () => {
    await axios
      .delete(`${API_CONFIG.baseUrl}/todo/${uid}/${todo_id}`)
      .then((res) => res.data);
  };

  deleteTodo();
};
