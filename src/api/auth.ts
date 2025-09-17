import { handleApiResponse } from "../helpers/apiHelper";
import type { User } from "../interfaces/user.interface";


const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string): Promise<User> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  return handleApiResponse<User>(res);
};
