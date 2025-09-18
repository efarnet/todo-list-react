import { handleApiResponse } from "../helpers/apiHelper";
import type { User } from "../interfaces/user.interface";


const API_URL = import.meta.env.VITE_API_URL;

export const login = async ({ email, password }: User): Promise<User> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  return handleApiResponse<User>(res);
};

export const signup = async ({ firstname, lastname, email, password, gender }: User ): Promise<User> => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname, lastname, email, password, gender }),
  });

  return handleApiResponse<User>(res);
};

export const logout = async (): Promise<User> => {
   const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

  return handleApiResponse<User>(res);
};

export const fetchMe = async () => {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include", 
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  return handleApiResponse<User>(res);
};
