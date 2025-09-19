export const Todos = {
  MAX_REMAINING: 8,
  MAX_CARACTERS: 50,
};

export type Gender = typeof Todos[keyof typeof Todos];
