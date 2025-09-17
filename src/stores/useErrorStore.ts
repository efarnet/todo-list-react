import { create } from "zustand";

interface ErrorState {
  errors: { [key: string]: string };
  setError: (field: string, message: string) => void;
  clearError: (field?: string) => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  errors: {},
  setError: (field, message) =>
    set((state) => ({ errors: { ...state.errors, [field]: message } })),
  clearError: (field) =>
    set((state) => ({
      errors: field
        ? Object.fromEntries(
            Object.entries(state.errors).filter(([key]) => key !== field)
          )
        : {},
    })),
}));
