import { makeAutoObservable, configure } from "mobx";
import type { TodoList } from "@interfaces/Todolist";
import type { TodoForm } from "@interfaces/TodoForm";

configure({
  enforceActions: "never",
});

export class TodoStoreImpl {
  allTodo: TodoList[] = [];
  todoList: TodoList[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  AddTodo = (data: TodoForm) => {
    const new_todo = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };

    this.todoList = [new_todo, ...this.todoList];
    this.allTodo = [new_todo, ...this.allTodo];
  };

  UpdateTodo = (id: string, data: TodoForm) => {
    this.todoList = this.todoList.map((item) => {
      if (item.id === id) {
        return { ...item, ...data };
      }
      return item;
    });

    this.allTodo = this.allTodo.map((item) => {
      if (item.id === id) {
        return { ...item, ...data };
      }
      return item;
    });
  };

  DeleteTodo = (id: string) => {
    this.todoList = this.todoList.filter((item) => item.id !== id);
    this.allTodo = this.allTodo.filter((item) => item.id !== id);
  };

  FilterTodo = (filter: string) => {
    switch (filter) {
      case "all":
        this.todoList = this.allTodo;
        break;
      case "favorite":
        this.todoList = this.allTodo.filter((item) => item.favorite);
        break;
      case "completed":
        this.todoList = this.allTodo.filter((item) => item.completed);
        break;
      case "uncompleted":
        this.todoList = this.allTodo.filter((item) => !item.completed);
        break;
      default:
        break;
    }
  };
}

export const TodoStore = new TodoStoreImpl();
