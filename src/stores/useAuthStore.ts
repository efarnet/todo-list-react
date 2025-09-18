import { create } from "zustand";
import type { User } from "../interfaces/user.interface";
import * as authApi from "../api/auth";
import { useErrorStore } from "./useErrorStore";

interface AuthState {
  user: User | null;
  loading: boolean;
  login: ({ email, password }: { email: string, password: string }) => Promise<void>;
  signup: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

type ApiError = { message: string } | Error;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  login: async ({ email, password }) => {
    const { setError } = useErrorStore.getState();

    set({ loading: true });
    try {
      const user = await authApi.login({ email, password });

      set({ user });

    } catch (err: unknown) {
      const error = err as ApiError;

      setError("auth", error.message || "Login failed");

      set({ user: null });
      set({ loading: false });
    } 
  },

  signup: async (user) => {
    const { setError } = useErrorStore.getState();

    set({ loading: true });
    try {
      const newUser = await authApi.signup(user);

      set({ user: newUser });
    } catch (err: unknown) {
      const error = err as ApiError;

      setError("auth", error.message || "Signup failed");

      set({ user: null });
      set({ loading: false });
    } 
  },

  logout: async () => {
    const { setError } = useErrorStore.getState();
    set({ loading: true });
    try {
      await authApi.logout();

      set({ user: null });
    } catch (err: unknown) {
      const error = err as ApiError;

      setError("auth", error.message || "Logout failed");
      set({ loading: false });
    } 
  },

  fetchUser: async () => {
    const { setError } = useErrorStore.getState();
    set({ loading: true });
    try {
      const user = await authApi.fetchMe();

      set({ user });
    } catch (err: unknown) {
      const error = err as ApiError;

      setError("auth", error.message || "Fetch user failed");
      set({ user: null });
      set({ loading: false });
    } 
  },
}));
