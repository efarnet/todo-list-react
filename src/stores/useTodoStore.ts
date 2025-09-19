import { create } from "zustand";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  type Todo,
} from "../api/todos";
import type { ApiError } from "../helpers/apiHelper";
import { useErrorStore } from "./useErrorStore";
import { Todos } from "../enums/Todos";

interface TodosState {
  todos: Todo[];
  remaining: number;
  loading: boolean;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

const { setError, clearError } = useErrorStore.getState();

export const useTodosStore = create<TodosState>((set, get) => ({
  todos: [],
  remaining: Todos.MAX_REMAINING,
  loading: false,



  fetchTodos: async () => {
    set({ loading: true });

    try {
      const todos = await fetchTodos();

      const notCompletedTodos = todos.filter((t) => !t.isCompleted);

      set({
        todos : notCompletedTodos,
        remaining: Todos.MAX_REMAINING - notCompletedTodos.length,
        loading: false,
      });

      clearError("todos");
    } catch (err) {
      const error = err as ApiError;

      setError("todos", error.message || "Failed to fetch todos");
    }
  },

  addTodo: async (title: string) => {
    set({ loading: true });
    try {
      const newTodo = await addTodo(title);
      const todos = [...get().todos, newTodo];

      set({
        todos,
        remaining: Todos.MAX_REMAINING - todos.length,
        loading: false,
      });

      clearError("todos");
    } catch (err) {
      const error = err as ApiError;

      setError("todos", error.message || "Failed to add todo");
    }
  },

  toggleTodo: async (id: number) => {
    const todo = get().todos.find((t) => t._id === id);
    if (!todo) return;

    set({ loading: true });
    try {

      const updatedTodo = await updateTodo(id, { isCompleted: !todo.isCompleted });

      const todos = get().todos.filter((t) => (t._id !== updatedTodo._id));

      set({
        todos,
        remaining: Todos.MAX_REMAINING - todos.length,
        loading: false,
      });

      clearError("todos");
    } catch (err) {
      const error = err as ApiError;

      setError("todos", error.message || "Failed to update todo");
    }
  },

  deleteTodo: async (id: number) => {
    set({ loading: true });
    try {
      await deleteTodo(id);
      const todos = get().todos.filter((t) => t._id !== id);

      set({
        todos,
        remaining: Todos.MAX_REMAINING - todos.length,
        loading: false,
      });

      clearError("todos");
    } catch (err) {
      const error = err as ApiError; 

      setError("todos", error.message || "Failed to delete todo");
    }
  },
}));
