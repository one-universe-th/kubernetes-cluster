import axios from "axios";
import { Cookies } from "react-cookie";
import { API_CONFIG } from "@config/api_cofig";
import { TodoList } from "@interfaces/Todolist";

export const useFavorite = (todo: TodoList) => {
  const uid = new Cookies().get("uid");

  const updateFavorite = async (favorite: boolean) => {
    await axios
      .put(`${API_CONFIG.baseUrl}/todo/${uid}`, {
        ...todo,
        favorite,
      })
      .then((res) => res.data);
  };

  updateFavorite(todo.favorite);

  return { updateFavorite };
};
