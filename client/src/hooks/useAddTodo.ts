import axios from "axios";
import { Cookies } from "react-cookie";
import { API_CONFIG } from "@config/api_cofig";

export interface AddTodoForm {
  title: string;
  description?: string;
  tag_name: string;
  tag_color: string;
  date: string;
  favorite: boolean;
  completed: boolean;
}

export const useAddTodo = (todo: AddTodoForm) => {
  const uid = new Cookies().get("uid");

  const addTodo = async () => {
    await axios
      .post(`${API_CONFIG.baseUrl}/todo/${uid}`, {
        ...todo,
      })
      .then((res) => res.data);
  };

  addTodo();
};
