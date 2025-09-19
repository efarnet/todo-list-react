import { handleApiResponse } from "../helpers/apiHelper";

export interface Todo {
  _id: number;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${API_URL}/todos/`, {
    method: "GET",
    credentials: "include",
  });

  return handleApiResponse<Todo[]>(res);
};

export const addTodo = async (title: string): Promise<Todo> => {
  const res = await fetch(`${API_URL}/todos/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
    credentials: "include",
  });

  return handleApiResponse<Todo>(res);
};

export const updateTodo = async (
  id: number,
  updates: Partial<Todo>
): Promise<Todo> => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
    credentials: "include",
  });

  return handleApiResponse<Todo>(res);
};

export const deleteTodo = async (id: number): Promise<{ success: boolean }> => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return handleApiResponse<{ success: boolean }>(res);
};
